import React from 'react';
import {Linking, StyleSheet, Text, TouchableOpacity} from 'react-native';

type ButtonLinkProps = {
  link: string;
  text: string;
};
export function ButtonLink(props: ButtonLinkProps) {
  const {link, text} = props;
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={() => {
        Linking.openURL(link);
      }}>
      <Text>{text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
  },
});
