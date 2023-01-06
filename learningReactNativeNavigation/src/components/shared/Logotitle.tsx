import React from 'react';
import {Image} from 'react-native';

export function LogoTitle(props: any) {
  return (
    <Image
      style={{width: 50, height: 50}}
      // source={require('@expo/snack-static/react-native-logo.png')}
      source={{
        uri: 'https://reactnative.dev/img/tiny_logo.png',
      }}
    />
  );
}
