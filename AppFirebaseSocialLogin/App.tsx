import React from 'react';
import {AppAuthenticationFlowWithGoogle} from './src/components/App/AppAuthenticationFlowWithGoogle';
import {NavigationContainer} from '@react-navigation/native';

function App() {
  return (
    <NavigationContainer>
      <AppAuthenticationFlowWithGoogle />
    </NavigationContainer>
  );
}

export default App;
