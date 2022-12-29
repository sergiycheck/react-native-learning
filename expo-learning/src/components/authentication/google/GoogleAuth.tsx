import * as React from 'react';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { Button, View } from 'react-native';

WebBrowser.maybeCompleteAuthSession();

export function GoogleAuthentication({ navigation, route }: any) {
  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId:
      '747009639696-634td1g8bkgv06kihlcls4o29ots8rg2.apps.googleusercontent.com',
    // requires paid Apple Developer account 99 USD
    iosClientId: 'GOOGLE_GUID.apps.googleusercontent.com',
    androidClientId:
      '747009639696-lt5ljoojdh7fn01uvevn78l651a0l9rp.apps.googleusercontent.com',
    webClientId:
      '747009639696-pvojhmgv8nfof3p97kp44v2519fcku7v.apps.googleusercontent.com',
  });

  React.useEffect(() => {
    if (response?.type === 'success') {
      const { authentication } = response;
      console.log('authentication', authentication);
    }
  }, [response]);

  return (
    <View>
      <Button
        disabled={!request}
        title="Login"
        onPress={() => {
          promptAsync();
        }}
      />
      <Button title="Go back" onPress={() => navigation.goBack()} />
    </View>
  );
}
