import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import Routes from './routes';

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <StatusBar translucent backgroundColor="transparent" />
      {/* <StatusBar hidden /> */}
      <Routes />
    </NavigationContainer>
  );
};

export default App;
