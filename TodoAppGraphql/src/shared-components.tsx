import React, {PropsWithChildren} from 'react';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {useColorScheme, ScrollView, View, StyleSheet, Text} from 'react-native';

export const ScrollViewWithDarkMode = ({children}: PropsWithChildren) => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      style={backgroundStyle}>
      <View
        style={{
          backgroundColor: isDarkMode ? Colors.black : Colors.white,
        }}>
        {children}
      </View>
    </ScrollView>
  );
};

export function Section({children}: PropsWithChildren): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={defaultStyles.sectionContainer}>
      <Text
        style={[
          defaultStyles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
}

const defaultStyles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },

  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
});

export const TextCenter = ({children}: PropsWithChildren) => {
  return <Text style={customStyles.textCenter}>{children}</Text>;
};

export const customStyles = StyleSheet.create({
  textCenter: {
    textAlign: 'center',
  },
});
