import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { watchPosition, startService, stopService } from './native/GPSForegroundService';

const App: React.FC = () => {
  useEffect(() => {
    startService();
    const listener = watchPosition((params) => console.log(params));

    return () => {
      listener.remove();
      stopService();
    };
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>BIKER APP</Text>
    </View>
  );
};

export default App;
