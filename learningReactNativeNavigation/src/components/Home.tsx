import React from 'react';
import {useColorScheme} from 'react-native';
import {routes} from '../routes';
import {
  Button,
  View,
  SafeAreaView,
  Text,
  ScrollView,
  StatusBar,
} from 'react-native';
import {Separator} from './shared/Separator';

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
          <Separator />
          <Button
            title="other"
            onPress={() => navigation.navigate(routes.other)}
          />
          <Separator />
          <Button
            title="profile"
            onPress={() =>
              navigation.navigate(routes.profile, {name: 'some name'})
            }
          />
          <Separator />
          <Button
            title="home with count"
            onPress={() => navigation.navigate(routes.homeWithCount)}
          />
          <Separator />
          <Button
            title="home with innerTabs"
            onPress={() => navigation.navigate(routes.HomeWithInnerTabs)}
          />
          <Separator />

          <Button
            title="home with nested tabs and drawer"
            onPress={() => navigation.navigate(routes.AppWithNestedDrawler)}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
