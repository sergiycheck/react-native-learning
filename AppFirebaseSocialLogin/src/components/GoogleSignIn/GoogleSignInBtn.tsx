import React from 'react';
import {Button} from 'react-native';
import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

GoogleSignin.configure({
  webClientId:
    '198197638482-rb4fb7v1tfs6puhb9m8b7kjljtjg99ki.apps.googleusercontent.com',
});
async function onGoogleButtonPress() {
  // Check if your device supports Google Play
  await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});

  // Get the users ID token
  const {idToken} = await GoogleSignin.signIn();

  // Create a Google credential with the token
  const googleCredential = auth.GoogleAuthProvider.credential(idToken);

  // Sign-in the user with the credential
  return auth().signInWithCredential(googleCredential);
}

export function GoogleSignIn() {
  return (
    <Button
      title="Google Sign-In"
      onPress={() =>
        onGoogleButtonPress()
          .then(data =>
            console.log('Signed in with Google!', JSON.stringify(data)),
          )
          .catch(err => {
            console.error(err);
          })
      }
    />
  );
}
