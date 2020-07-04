import AsyncStorage from '@react-native-community/async-storage';
import React, { useEffect, useState, useCallback, useRef } from 'react';

import { v4 as uuidv4 } from 'uuid';
import { getTime } from 'date-fns';
import * as GeoLib from 'geolib';

import GPSForegroundService, { Position } from '../../native/GPSForegroundService';

import Timer from '../../components/Timer';
import Statistics from '../../components/Statistics';
import Travels, { Travel } from '../../components/Travel';

import { Container, TravelContainer, TravelHeader } from './styles';

const Main: React.FC = () => {
  const watchPositionRefValue = useRef<number>(0);
  const coordenatesRefValue = useRef<Position[]>([]);

  const [loading, setLoading] = useState<boolean>(false);
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

  const handleStopTimer = useCallback(() => {
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
    AsyncStorage.setItem('@Biker/Travels', JSON.stringify(newTravels));
    setTravels(newTravels);

    const newTotalDistance = totalDistance + currentTotalDistanceInKM;
    AsyncStorage.setItem('@Biker/totalDistance', JSON.stringify(newTotalDistance));
    setTotalDistance(newTotalDistance);

    const newAverageDistance = newTotalDistance / newTravels.length;
    AsyncStorage.setItem('@Biker/averageDistance', JSON.stringify(newAverageDistance));
    setAverageDistance(newAverageDistance);
  }, [totalDistance, travels]);

  const handleResetTimer = useCallback(() => {}, []);

  // set async storage here must be done without await or with await
  // after setting travels otherwise the LayoutAnimation
  // inside Travels wont be able to 'animate' layout changes.
  const handleOnItemRemoval = useCallback(
    async (id) => {
      const updatedTravels = travels.filter((travel) => travel.id !== id);
      AsyncStorage.setItem('@Biker/Travels', JSON.stringify(updatedTravels));
      setTravels(updatedTravels);
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

      setTimeout(() => setLoading(false), 3000);
    };

    setLoading(true);
    loadStoredRoutes();
  }, []);

  return (
    <Container>
      <Timer onTimerStart={handleStartTimer} onTimerStop={handleStopTimer} onTimerReset={handleResetTimer} />
      <Statistics loading={loading} totalDistance={totalDistance} averageDailyDistance={averageDistance} />

      <TravelContainer>
        <TravelHeader>ATIVIDADES PASSADAS</TravelHeader>
        <Travels travels={travels} onItemRemoval={handleOnItemRemoval} />
      </TravelContainer>
    </Container>
  );
};

export default Main;
