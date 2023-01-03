import React from 'react';
import {
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  View,
} from 'react-native';
import {useColorScheme} from 'react-native';
import {routes} from '../routes';

export const Home = ({navigation}: any) => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? 'dark' : 'gray',
  };

  const textColor = {
    backgroundColor: !isDarkMode ? 'white' : 'black',
  };
  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <View
          style={{
            backgroundColor: textColor.backgroundColor,
          }}>
          <Text>some text</Text>
          <Button
            title="other"
            onPress={() => navigation.navigate(routes.other)}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
