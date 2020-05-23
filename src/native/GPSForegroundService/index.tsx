import { NativeModules, NativeEventEmitter, EmitterSubscription } from 'react-native';

declare type WatchPositionParams = { latitude: number; longitude: number };
declare type WatchPositionCallback = (params: WatchPositionParams) => void;

export const startService = (): void => {
  NativeModules.GPSForegroundModule.startService();
};

export const stopService = (): void => {
  NativeModules.GPSForegroundModule.stopService();
};

export const watchPosition = (callback: WatchPositionCallback): EmitterSubscription => {
  const eventEmitter = new NativeEventEmitter(NativeModules.GPSForegroundModule);
  const eventListener = eventEmitter.addListener('onLocationChanged', callback);

  return eventListener;
};

export default NativeModules.GPSForegroundService;
