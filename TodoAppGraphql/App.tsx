import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  useColorScheme,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';

import {ApolloClient, InMemoryCache, ApolloProvider} from '@apollo/client';
import {Todos} from './src/Todos';
import {TextCenter} from './src/shared-components';
import {relayStylePagination} from '@apollo/client/utilities';

const client = new ApolloClient({
  uri: 'http://10.0.2.2:3024/graphql',
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          queryCursorBasedPaginated: relayStylePagination(),
        },
      },
    },
  }),
});

const RootComponent = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  return (
    <SafeAreaView style={{...appStyles.container, ...backgroundStyle}}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <TextCenter>Todos title</TextCenter>
      <Todos />
    </SafeAreaView>
  );
};

function App(): JSX.Element {
  return (
    <ApolloProvider client={client}>
      <RootComponent />
    </ApolloProvider>
  );
}

export default App;

export const appStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});
