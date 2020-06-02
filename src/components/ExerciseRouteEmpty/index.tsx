import React from 'react';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

import {
  Unit,
  RouteListItem,
  RouteListItemDaily,
  RouteListItemDailyHeader,
  RouteListItemDailyInfoContainer,
  RouteListItemDailyInfo,
} from './styles';

const ExerciseRouteItem: React.FC = () => {
  return (
    <RouteListItem>
      <RouteListItemDaily>
        <RouteListItemDailyHeader>Hoje</RouteListItemDailyHeader>
        <RouteListItemDailyInfoContainer>
          <RouteListItemDailyInfo>0</RouteListItemDailyInfo>
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
      />
    </RouteListItem>
  );
};

export default ExerciseRouteItem;
