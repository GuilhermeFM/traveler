import AsyncStorage from '@react-native-community/async-storage';
import React, { useEffect, useState, useCallback, useRef } from 'react';
import { FlatList } from 'react-native';

import { v4 as uuidv4 } from 'uuid';
import { getTime } from 'date-fns';
import * as GeoLib from 'geolib';

import GPSForegroundService, { Position } from '../../native/GPSForegroundService';

import ExerciseStatistics from '../../components/ExerciseStatistics';
import ExerciseRouteEmpty from '../../components/ExerciseRouteEmpty';
import ExerciseRouteItem from '../../components/ExerciseRouteItem';
import ExerciseTimer from '../../components/ExerciseTimer';

import { Container, RoutesListContainer } from './styles';

interface Travel {
  id: string;
  travelDate: number;
  totalDistance: number;
  coordenates: Position[];
}

const Main: React.FC = () => {
  const watchPositionRefValue = useRef<number>(0);
  const coordenatesRefValue = useRef<Position[]>([]);

  const [totalDistance, setTotalDistance] = useState<number>(0);
  const [averageDistance, setAverageDistance] = useState<number>(0);
  const [travels, setTravels] = useState<Travel[]>([]);

  const handleStartTimer = useCallback(() => {
    GPSForegroundService.startService();

    coordenatesRefValue.current = [];
    watchPositionRefValue.current = GPSForegroundService.startWatchPosition((coordenates) => {
      coordenatesRefValue.current.push(coordenates);
    });
  }, []);

  const handleStopTimer = useCallback(async () => {
    GPSForegroundService.stopWatchPosition(watchPositionRefValue.current);
    GPSForegroundService.stopService();

    const currentTotalDistanceInKM = GeoLib.getPathLength(coordenatesRefValue.current) / 1000;

    const travel: Travel = {
      id: uuidv4(),
      travelDate: getTime(new Date()),
      totalDistance: currentTotalDistanceInKM,
      coordenates: coordenatesRefValue.current,
    };

    const newTravels = travels.length > 0 ? [...travels, { ...travel }] : [{ ...travel }];
    await AsyncStorage.setItem('@Biker/Travels', JSON.stringify(newTravels));
    setTravels(newTravels);

    const newTotalDistance = totalDistance + currentTotalDistanceInKM;
    await AsyncStorage.setItem('@Biker/totalDistance', JSON.stringify(newTotalDistance));
    setTotalDistance(newTotalDistance);

    const newAverageDistance = newTotalDistance / newTravels.length;
    await AsyncStorage.setItem('@Biker/averageDistance', JSON.stringify(newAverageDistance));
    setAverageDistance(newAverageDistance);
  }, [totalDistance, travels]);

  const handleResetTimer = useCallback(() => {}, []);

  useEffect(() => {
    const loadStoredRoutes = async (): Promise<void> => {
      const travelsString = await AsyncStorage.getItem('@Biker/Travels');
      const totalDistanceString = await AsyncStorage.getItem('@Biker/totalDistance');
      const averageDistanceString = await AsyncStorage.getItem('@Biker/averageDistance');

      if (travelsString) setTravels(JSON.parse(travelsString));
      if (totalDistanceString) setTotalDistance(JSON.parse(totalDistanceString));
      if (averageDistanceString) setAverageDistance(JSON.parse(averageDistanceString));
    };

    loadStoredRoutes();
  }, []);

  return (
    <Container>
      <ExerciseTimer onTimerStart={handleStartTimer} onTimerStop={handleStopTimer} onTimerReset={handleResetTimer} />
      <ExerciseStatistics totalDistance={totalDistance} averageDailyDistance={averageDistance} />

      <RoutesListContainer>
        <FlatList
          horizontal
          data={travels}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(currentTravel) => currentTravel.id}
          ListEmptyComponent={() => <ExerciseRouteEmpty />}
          renderItem={({ item: currentTravel }) => (
            <ExerciseRouteItem
              route={currentTravel.coordenates}
              date={currentTravel.travelDate}
              distance={currentTravel.totalDistance}
            />
          )}
        />
      </RoutesListContainer>
    </Container>
  );
};

export default Main;
