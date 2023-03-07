import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {StyleSheet, Text, TextInput, View} from 'react-native';

type AutneticationStateType = {
  isLoading: boolean;
  userToken: string;
  isSignout: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setUserToken: React.Dispatch<React.SetStateAction<string>>;
  setIsSignout: React.Dispatch<React.SetStateAction<boolean>>;
};
const authState: AutneticationStateType = {
  isLoading: false,
  userToken: '',
  isSignout: false,
  setIsLoading: _value => {},
  setUserToken: _value => {},
  setIsSignout: _value => {},
};

const AuthenticationContext = React.createContext(authState);

export const AuthenticationProvider = ({
  children,
}: {
  children?: JSX.Element;
}) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [userToken, setUserToken] = React.useState('');
  const [isSignout, setIsSignout] = React.useState(false);
  const valueToPassForAuthContext = {
    isLoading,
    setIsLoading,
    userToken,
    setUserToken,
    isSignout,
    setIsSignout,
  };
  return (
    <AuthenticationContext.Provider value={valueToPassForAuthContext}>
      {children}
    </AuthenticationContext.Provider>
  );
};

export const AuthenticationFlowApp = () => {
  return (
    <AuthenticationProvider>
      <AppAuthenticationContent />
    </AuthenticationProvider>
  );
};

const Stack = createNativeStackNavigator();

function AppAuthenticationContent() {
  const state = React.useContext(AuthenticationContext);
  if (state.isLoading) {
    // We haven't finished checking for the token yet
    return <SplashScreen />;
  }

  return (
    <Stack.Navigator>
      {state.userToken == null ? (
        // No token found, user isn't signed in
        <>
          <Stack.Screen
            name="SignIn"
            component={SignInScreen}
            options={{
              title: 'Sign in',
              // When logging out, a pop animation feels intuitive
              // You can remove this if you want the default 'push' animation
              animationTypeForReplace: state.isSignout ? 'pop' : 'push',
            }}
          />
          <Stack.Screen name="SignUp" component={SignUpScreen} />
          <Stack.Screen name="ResetPassword" component={ResetPassword} />
        </>
      ) : (
        // User is signed in
        <>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Profile" component={ProfileScreen} />
        </>
      )}
    </Stack.Navigator>
  );
}

function SplashScreen() {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Loading...</Text>
    </View>
  );
}

function SignInScreen() {
  const [text, onChangeText] = React.useState('');

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        value={text}
        placeholder="Enter the key for the value you want to get"
      />
    </View>
  );
}

function SignUpScreen() {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>SignUpScreen.</Text>
    </View>
  );
}

function ResetPassword() {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>ResetPassword.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});

function HomeScreen() {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Home.</Text>
    </View>
  );
}

function ProfileScreen() {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>ProfileScreen.</Text>
    </View>
  );
}
