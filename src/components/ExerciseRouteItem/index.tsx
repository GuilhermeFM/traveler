import React, { useMemo } from 'react';
import { format, isYesterday, isToday } from 'date-fns';
import MapView, { Polyline, PROVIDER_GOOGLE } from 'react-native-maps';

import { Position } from '../../native/GPSForegroundService';

import {
  Unit,
  RouteListItem,
  RouteListItemDaily,
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
    else format(date, 'dd/MM/yyyy');

    return retorno;
  }, [date]);

  return (
    <RouteListItem>
      <RouteListItemDaily>
        <RouteListItemDailyHeader>{formatedDate}</RouteListItemDailyHeader>
        <RouteListItemDailyInfoContainer>
          <RouteListItemDailyInfo>{formatedDistance}</RouteListItemDailyInfo>
          <Unit>KMs</Unit>
        </RouteListItemDailyInfoContainer>
      </RouteListItemDaily>
      <MapView
        liteMode
        style={{ width: 300, height: 100 }}
        provider={PROVIDER_GOOGLE}
        region={{
          latitude: -20.3113452,
          longitude: -40.2986506,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}
      >
        {route && route.length > 0 && (
          <Polyline coordinates={route} strokeWidth={2.5} lineJoin="round" lineCap="butt" />
        )}
      </MapView>
    </RouteListItem>
  );
};

export default ExerciseRouteItem;
