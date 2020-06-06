import React, { useMemo } from 'react';
import { format, isYesterday, isToday } from 'date-fns';
import MapView, { Polyline, Region, PROVIDER_GOOGLE } from 'react-native-maps';
import * as GeoLib from 'geolib';

import { Position } from '../../native/GPSForegroundService';

import {
  Unit,
  TravelItem,
  TravelInfoContainer,
  RouteListItemDailyHeader,
  RouteListItemDailyInfoContainer,
  RouteListItemDailyInfo,
} from './styles';

interface ExerciseRouteItemProps {
  route: Position[];
  date: number;
  distance: number;
}

const ExerciseRouteItem: React.FC<ExerciseRouteItemProps> = ({ route, date, distance }) => {
  const formatedDistance = useMemo(() => new Intl.NumberFormat('pt-BR', { style: 'decimal' }).format(distance), [
    distance,
  ]);

  const formatedDate = useMemo(() => {
    let retorno;

    if (isToday(date)) retorno = 'Hoje';
    else if (isYesterday(date)) retorno = 'Ontem';
    else retorno = format(date, 'dd/MM/yyyy');

    return retorno;
  }, [date]);

  const region: Region = useMemo(() => {
    if (route && route.length > 0) {
      const { latitude, longitude } = GeoLib.getCenterOfBounds(route);
      const bounds = GeoLib.getBounds(route);

      return {
        latitude,
        longitude,
        latitudeDelta: bounds.maxLat - bounds.minLat,
        longitudeDelta: bounds.maxLng - bounds.minLng,
      };
    }

    return {
      latitude: -20.3113452,
      longitude: -40.2986506,
      latitudeDelta: 0.015,
      longitudeDelta: 0.0121,
    };
  }, [route]);

  return (
    <TravelItem>
      <TravelInfoContainer>
        <RouteListItemDailyHeader>{formatedDate}</RouteListItemDailyHeader>
        <RouteListItemDailyInfoContainer>
          <RouteListItemDailyInfo>{formatedDistance}</RouteListItemDailyInfo>
          <Unit>KMs</Unit>
        </RouteListItemDailyInfoContainer>
      </TravelInfoContainer>
      <MapView liteMode style={{ width: '100%', height: '55%' }} provider={PROVIDER_GOOGLE} region={region}>
        {route && route.length > 0 && (
          <Polyline coordinates={route} strokeWidth={2.5} lineJoin="round" lineCap="butt" />
        )}
      </MapView>
    </TravelItem>
  );
};

export default ExerciseRouteItem;
