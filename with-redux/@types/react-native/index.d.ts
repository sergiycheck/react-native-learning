import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

declare module 'react-native' {
  interface View {
    render(): React.ReactNode | any;
  }
  interface ScrollView {
    render(): React.ReactNode | any;
  }
  interface Text {
    render(): React.ReactNode | any;
  }
  interface TouchableOpacity {
    render(): React.ReactNode | any;
  }
  interface TextInput {
    render(): React.ReactNode | any;
  }
}
