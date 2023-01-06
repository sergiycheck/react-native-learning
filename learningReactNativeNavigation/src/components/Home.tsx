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
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text>some text</Text>
          <Button
            title="other"
            onPress={() => navigation.navigate(routes.other)}
          />
          <Button
            title="profile"
            onPress={() =>
              navigation.navigate(routes.profile, {name: 'some name'})
            }
          />
          <Button
            title="home with count"
            onPress={() => navigation.navigate(routes.homeWithCount)}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
