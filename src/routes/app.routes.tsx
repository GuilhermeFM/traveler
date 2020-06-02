import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Main from '../pages/Main';

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
      <Stack.Screen name="Main" component={Main} />
      {/* <Stack.Screen name="Home" component={Map} /> */}
    </Stack.Navigator>
  );
};

export default Routes;
