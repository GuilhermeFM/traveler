import {
  NativeModules,
  NativeEventEmitter,
  EmitterSubscription,
} from 'react-native';

export type Position = { latitude: number; longitude: number };
export type WatchPositionCallback = (params: Position) => void;

interface Listener {
  id: number;
  eventListener: EmitterSubscription;
}

class GPSForegroundService {
  private registeredListeners: Listener[] = [];

  public startService(): void {
    NativeModules.GPSForegroundModule.startService();
  }

  public stopService = (): void => {
    NativeModules.GPSForegroundModule.stopService();
  };

  public startWatchPosition = (callback: WatchPositionCallback): number => {
    const eventEmitter = new NativeEventEmitter(
      NativeModules.GPSForegroundModule,
    );
    const eventListener = eventEmitter.addListener(
      'onLocationChanged',
      callback,
    );
    const lastAddedListenerId = this.registeredListeners.reduce(
      (prevListenerId, currentListener) =>
        currentListener.id > prevListenerId
          ? currentListener.id
          : prevListenerId,
      1,
    );

    this.registeredListeners.push({
      eventListener,
      id: lastAddedListenerId + 1,
    });
    return lastAddedListenerId + 1;
  };

  public stopWatchPosition = (id: number): void => {
    const foundListener = this.registeredListeners.find(
      (currentListener) => currentListener.id === id,
    );

    if (foundListener) {
      foundListener.eventListener.remove();
    }
  };
}

export default new GPSForegroundService();
