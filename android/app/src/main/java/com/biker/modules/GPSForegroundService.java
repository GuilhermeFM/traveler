package com.biker.modules;

import android.app.Notification;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.app.Service;
import android.content.Context;
import android.content.Intent;
import android.location.Location;
import android.location.LocationListener;
import android.location.LocationManager;
import android.os.Binder;
import android.os.Build;
import android.os.Bundle;
import android.os.IBinder;
import android.util.Log;

import androidx.core.app.NotificationCompat;

import com.biker.MainActivity;
import com.biker.R;


public class GPSForegroundService extends Service implements LocationListener {
  private final int NOTIFICATION_ID = 75421;

  private IBinder binder = new LocalBinder();
  private LocationListener clientLocationListener;
  private LocationManager locationManager;

  class LocalBinder extends Binder {
    GPSForegroundService getService() {
      return GPSForegroundService.this;
    }
  }

  //region Methods - Service life cycle
  @Override
  public void onCreate() {
    super.onCreate();

    if (locationManager == null) {
      locationManager = (LocationManager) getApplicationContext().getSystemService(Context.LOCATION_SERVICE);
      try {
        int LOCATION_INTERVAL = 1000;
        float LOCATION_DISTANCE = 10f;
        locationManager.requestLocationUpdates(LocationManager.GPS_PROVIDER, LOCATION_INTERVAL, LOCATION_DISTANCE, this);
      } catch (SecurityException ignored) {
        Log.i("GPSForegroundService", "Missing permission");
      }
    }
  }

  @Override
  public void onDestroy() {
    super.onDestroy();

    if (locationManager != null)
      locationManager.removeUpdates(this);
  }

  @Override
  public int onStartCommand(Intent intent, int flags, int startId) {
    Log.i("LocalService", "Received start id " + startId + ": " + intent);

    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
      int importance = NotificationManager.IMPORTANCE_DEFAULT;
      NotificationChannel channel = new NotificationChannel("BikeTracker:GeoService", "BikeTracker:GeoService", importance);
      channel.setDescription("BikeTracker:GeoService");
      NotificationManager notificationManager = getSystemService(NotificationManager.class);
      notificationManager.createNotificationChannel(channel);
    }

    Intent notificationIntent = new Intent(this, MainActivity.class);
    PendingIntent pendingIntent = PendingIntent.getActivity(this, 0, notificationIntent, 0);

    NotificationCompat.Builder builder = new NotificationCompat.Builder(this, "BikeTracker:GeoService");
    builder = builder.setContentTitle("Bike Tracker");
    builder = builder.setContentText("Bike Tracker is running in background to collect location data.");
    builder = builder.setTicker("TICKER TEXT");
    builder = builder.setSmallIcon(R.drawable.icon);
    builder = builder.setContentIntent(pendingIntent);
    builder = builder.setOngoing(true);

    Notification notification = builder.build();
    startForeground(NOTIFICATION_ID, notification);

    return START_STICKY;
  }

  @Override
  public IBinder onBind(Intent intent) {
    return binder;
  }
  //endregion

  //region Methods - Location Listener implementation
  @Override
  public void onLocationChanged(Location location) {
    if (this.clientLocationListener != null)
      this.clientLocationListener.onLocationChanged(location);
  }

  @Override
  public void onStatusChanged(String s, int i, Bundle bundle) {
    if (this.clientLocationListener != null)
      this.clientLocationListener.onStatusChanged(s, i, bundle);
  }

  @Override
  public void onProviderEnabled(String s) {
    if (this.clientLocationListener != null)
      this.clientLocationListener.onProviderEnabled(s);
  }

  @Override
  public void onProviderDisabled(String s) {
    if (this.clientLocationListener != null)
      this.clientLocationListener.onProviderDisabled(s);
  }
  //endregion

  //region Methods - Setters
  public void setClientLocationListener(LocationListener locationListener) {
    this.clientLocationListener = locationListener;
  }
  //endregion
}
