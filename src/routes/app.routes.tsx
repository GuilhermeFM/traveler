import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Profile from '../pages/Profile';
import Map from '../pages/Map';

const Stack = createStackNavigator();

const Routes: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: {
          backgroundColor: '#232a44',
        },
      }}
    >
      <Stack.Screen name="Profile" component={Profile} />
      {/* <Stack.Screen name="Home" component={Map} /> */}
    </Stack.Navigator>
  );
};

export default Routes;
