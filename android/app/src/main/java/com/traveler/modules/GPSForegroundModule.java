package com.traveler.modules;

import android.content.ComponentName;
import android.content.Context;
import android.content.Intent;
import android.content.ServiceConnection;
import android.location.Location;
import android.location.LocationListener;
import android.os.Bundle;
import android.os.IBinder;
import android.util.Log;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableNativeMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;

import javax.annotation.Nonnull;

public class GPSForegroundModule extends ReactContextBaseJavaModule implements LocationListener {
  private boolean shouldUnbind;
  private GPSForegroundService GPSForegroundService;

  private final GeoServiceConnection geoServiceConnection;
  private final ReactContext reactContext;

  private final String ON_LOCATION_CHANGED = "onLocationChanged";
  private final String ON_STATUS_CHANGED = "onStatusChanged";
  private final String ON_PROVIDER_ENABLED = "onProviderEnabled";
  private final String ON_PROVIDER_DISABLED = "onProviderDisabled";

  GPSForegroundModule(@Nonnull ReactApplicationContext reactContext) {
    super(reactContext);

    this.reactContext = reactContext;
    this.geoServiceConnection = new GeoServiceConnection();
  }

  //region Methods - React Bridge
  @Nonnull
  @Override
  public String getName() {
    return "GPSForegroundModule";
  }

  @ReactMethod
  public void startService() {
    reactContext.startService(new Intent(this.reactContext, GPSForegroundService.class));
    shouldUnbind = reactContext.bindService(new Intent(this.reactContext, GPSForegroundService.class), geoServiceConnection, Context.BIND_AUTO_CREATE);

    if (!shouldUnbind) {
      Log.e("MY_APP_TAG", "Error: The requested service doesn't exist, or this client isn't allowed access to it.");
    }
  }

  @ReactMethod
  public void stopService() {
    if (shouldUnbind) {
      reactContext.stopService(new Intent(this.reactContext, GPSForegroundService.class));
      reactContext.unbindService(geoServiceConnection);
      shouldUnbind = false;
    }
  }
  //endregion

  //region Methods - Location Listener
  @Override
  public void onLocationChanged(Location location) {
    WritableMap params = new WritableNativeMap();
    params.putDouble("latitude", location.getLatitude());
    params.putDouble("longitude", location.getLongitude());

    reactContext
      .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
      .emit(ON_LOCATION_CHANGED, params);
  }

  @Override
  public void onStatusChanged(String s, int i, Bundle bundle) {
    WritableMap params = new WritableNativeMap();
    params.putString("provider", s);
    params.putInt("Status", i);

    reactContext
      .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
      .emit(ON_STATUS_CHANGED, params);
  }

  @Override
  public void onProviderEnabled(String s) {
    WritableMap params = new WritableNativeMap();
    params.putString("provider", s);

    reactContext
      .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
      .emit(ON_PROVIDER_ENABLED, params);
  }

  @Override
  public void onProviderDisabled(String s) {
    WritableMap params = new WritableNativeMap();
    params.putString("provider", s);

    reactContext
      .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
      .emit(ON_PROVIDER_DISABLED, params);
  }
  //endregion

  //region Supporting classes
  private class GeoServiceConnection implements ServiceConnection {
    public void onServiceConnected(ComponentName className, IBinder service) {
      GPSForegroundService = ((GPSForegroundService.LocalBinder) service).getService();

      if (GPSForegroundService != null)
        GPSForegroundService.setClientLocationListener(GPSForegroundModule.this);
    }

    public void onServiceDisconnected(ComponentName className) {
      if (GPSForegroundService != null)
        GPSForegroundService.setClientLocationListener(null);

      GPSForegroundService = null;
    }
  }
  //endregion
}
