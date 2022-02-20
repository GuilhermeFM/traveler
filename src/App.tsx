import React, { useEffect } from 'react';
import { StatusBar, PermissionsAndroid } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import Routes from './routes';

const App: React.FC = () => {
  useEffect(() => {
    const askPermission = async (): Promise<void> => {
      await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
      await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
      );
    };

    askPermission();
  });

  return (
    <NavigationContainer>
      <StatusBar translucent backgroundColor="transparent" />
      <Routes />
    </NavigationContainer>
  );
};

export default App;
