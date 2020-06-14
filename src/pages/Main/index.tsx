import AsyncStorage from '@react-native-community/async-storage';
import React, { useEffect, useState, useCallback, useRef } from 'react';
import { FlatList } from 'react-native';

import { v4 as uuidv4 } from 'uuid';
import { getTime } from 'date-fns';
import * as GeoLib from 'geolib';

import GPSForegroundService, { Position } from '../../native/GPSForegroundService';

import Timer from '../../components/Timer';
import Statistics from '../../components/Statistics';
import TravelItem from '../../components/TravelItem';
import TravelItemAnimated from '../../components/TravelItem/Animated';

import { Container, TravelContainer, TravelHeader, TravelList } from './styles';

interface Travel {
  id: string;
  travelDate: number;
  totalDistance: number;
  coordenates: Position[];
}

const Main: React.FC = () => {
  const watchPositionRefValue = useRef<number>(0);
  const coordenatesRefValue = useRef<Position[]>([]);
  const travelsRef = useRef<FlatList>();

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

    const newTravels = travels.length > 0 ? [{ ...travel }, ...travels] : [{ ...travel }];
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

  const handleOnItemRemoval = useCallback(
    (id) => setTravels((prevTravelsState) => prevTravelsState.filter((travel) => travel.id !== id)),
    [],
  );

  const handleOnItemFadeIn = useCallback(
    (id) => {
      const indexLastElementInTravels = travels.findIndex((travel) => travel.id === id);
      const isLastElementInTravels = indexLastElementInTravels === travels.length - 1;

      // last and only element on list, set list index to ZERO
      if (isLastElementInTravels && travels.length === 1) {
        travelsRef.current?.scrollToIndex({ animated: true, index: 0 });
      }

      // last element on list, set list index to last - 1
      if (isLastElementInTravels && travels.length > 1) {
        travelsRef.current?.scrollToIndex({ animated: true, index: indexLastElementInTravels - 1 });
      }
    },
    [travels],
  );

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
      <Timer onTimerStart={handleStartTimer} onTimerStop={handleStopTimer} onTimerReset={handleResetTimer} />
      <Statistics totalDistance={totalDistance} averageDailyDistance={averageDistance} />

      <TravelContainer>
        <TravelHeader>ATIVIDADES PASSADAS</TravelHeader>
        <TravelList
          ref={travelsRef}
          horizontal
          data={travels}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(currentTravel) => currentTravel.id}
          renderItem={({ item: currentTravel }) => (
            <TravelItemAnimated
              onItemFadeIn={() => handleOnItemFadeIn(currentTravel.id)}
              onItemRemoval={() => handleOnItemRemoval(currentTravel.id)}
            >
              <TravelItem
                route={currentTravel.coordenates}
                date={currentTravel.travelDate}
                distance={currentTravel.totalDistance}
              />
            </TravelItemAnimated>
          )}
        />
      </TravelContainer>
    </Container>
  );
};

export default Main;
