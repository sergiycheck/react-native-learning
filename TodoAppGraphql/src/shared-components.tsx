import React, {PropsWithChildren} from 'react';
import {useColorScheme, ScrollView, View, StyleSheet, Text} from 'react-native';

const Colors = {
  black: 'black',
  white: 'white',
};

export const ScrollViewWithDarkMode = ({children}: PropsWithChildren) => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.black : Colors.white,
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
            color: isDarkMode ? Colors.black : Colors.white,
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

export const TextCenter = ({
  children,
  style,
}: PropsWithChildren & {style?: any}) => {
  return <Text style={[customStyles.textCenter, style]}>{children}</Text>;
};

export const customStyles = StyleSheet.create({
  textCenter: {
    textAlign: 'center',
  },
});
