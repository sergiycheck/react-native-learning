import React from 'react';
import {Button, Dimensions, Image, ScrollView, Text, View} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import EncryptedStorage from 'react-native-encrypted-storage';
import {Separator} from '../shared/Separator';
import {GoogleSignIn} from '../GoogleSignIn/GoogleSignInBtn';
import {FirebaseAuthTypes} from '@react-native-firebase/auth';

type AuthType = {
  isLoading: boolean;
  userData: FirebaseAuthTypes.UserCredential | undefined;
  isSignOut: boolean;
};

type AutneticationStateType = AuthType & {
  signIn: (data: AuthType) => Promise<void>;
  signOut: () => Promise<void>;
};
const reducerInitialState: AuthType = {
  isLoading: false,
  isSignOut: false,
  userData: undefined,
};
const authState: AutneticationStateType = {
  ...reducerInitialState,
  signIn: async (_data: AuthType) => await new Promise(resolve => resolve()),
  signOut: async () => await new Promise(resolve => resolve()),
};

const AuthContext = React.createContext(authState);

const Stack = createNativeStackNavigator();

export function AppAuthenticationFlowWithGoogle() {
  const [state, dispatch] = React.useReducer(
    (prevState: AuthType, action: any) => {
      switch (action.type) {
        case 'RESTORE_DATA':
          return {
            ...prevState,
            userData: action.payload,
            isLoading: false,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignOut: false,
            userData: action.payload,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignOut: true,
            userData: undefined,
          };
        default:
          throw new Error('no such action');
      }
    },
    {
      ...reducerInitialState,
    },
  );

  React.useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let userData;

      try {
        // Restore token stored in `SecureStore` or any other encrypted storage

        userData = await EncryptedStorage.getItem('userData');
        userData = JSON.parse(`${userData}`);
      } catch (e) {
        // Restoring token failed
      }

      // After restoring token, we may need to validate it in production apps

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      dispatch({type: 'RESTORE_DATA', payload: userData});
    };

    bootstrapAsync();
  }, []);

  const authContext = React.useMemo(
    () => ({
      signIn: async (data: AuthType) => {
        try {
          await EncryptedStorage.setItem(
            'userData',
            JSON.stringify(data.userData),
          );
        } catch (error) {
          console.log(error);
        }
        dispatch({type: 'SIGN_IN', payload: data.userData});
      },
      signOut: async () => {
        try {
          await EncryptedStorage.removeItem('userData');
        } catch (error) {
          console.log(error);
        }

        dispatch({type: 'SIGN_OUT'});
      },
    }),
    [],
  );

  return (
    <AuthContext.Provider value={{...state, ...authContext}}>
      <Stack.Navigator>
        {state.isLoading ? (
          <Stack.Screen name="Splash" component={SplashScreen} />
        ) : state.userData == null ? (
          // No token found, user isn't signed in
          <Stack.Screen
            name="SignIn"
            component={SignInScreen}
            options={{
              title: 'Sign in',
              // When logging out, a pop animation feels intuitive
              animationTypeForReplace: state.isSignOut ? 'pop' : 'push',
            }}
          />
        ) : (
          // User is signed in
          <Stack.Screen name="Home" component={HomeScreen} />
        )}

        <Stack.Screen
          navigationKey={state.userData != null ? 'user' : 'guest'}
          name="Help"
          component={HelpScreen}
        />
      </Stack.Navigator>
    </AuthContext.Provider>
  );
}

function SplashScreen() {
  return (
    <View>
      <Text>Loading...</Text>
    </View>
  );
}

function HomeScreen() {
  const {signOut, userData} = React.useContext(AuthContext);

  return (
    <ScrollView>
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        {userData && <GoogleUserComponent googleUser={userData} />}

        <Text>Signed in!</Text>
        <Text>{JSON.stringify(userData)}</Text>
        <Button title="Sign out" onPress={signOut} />
      </View>
    </ScrollView>
  );
}

const GoogleUserComponent = ({
  googleUser,
}: {
  googleUser: FirebaseAuthTypes.UserCredential;
}) => {
  const image = googleUser?.user?.photoURL;
  const [sizes, setSizes] = React.useState({width: 0, height: 0});
  React.useEffect(() => {
    if (image) {
      Image.getSize(image, (width, height) => {
        const screeenWidth = Dimensions.get('window').width;
        const scale = width / screeenWidth;
        const imageHeight = height / scale;
        setSizes(() => ({width: screeenWidth, height: imageHeight}));
      });
    }
  }, [image]);

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      {image && (
        <Image
          style={{width: sizes.width, height: sizes.height}}
          source={{uri: image}}
        />
      )}

      <Text>{googleUser?.user?.displayName}</Text>
      <Separator />
    </View>
  );
};

function SignInScreen() {
  const {signIn} = React.useContext(AuthContext);

  return (
    <View>
      <Separator />
      <Text>Sign in with google</Text>
      <GoogleSignIn
        onSingIn={data => {
          signIn({userData: data, isLoading: false, isSignOut: false});
        }}
      />
    </View>
  );
}

function HelpScreen() {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>HelpScreen.</Text>
    </View>
  );
}
