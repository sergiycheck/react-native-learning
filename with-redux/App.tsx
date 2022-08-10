import { StatusBar } from 'expo-status-bar';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux';
import { store } from './src/app/store';
import Counter from './src/counter/Conter';
import { Separator } from './src/sharedComponents';

export default function App() {
  return (
    <Provider store={store}>
      <ScrollView>
        <View style={styles.container}>
          <Text>It is working</Text>
          <StatusBar style="auto" />
        </View>
        <Counter />
      </ScrollView>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
