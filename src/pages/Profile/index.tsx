import React, { useState, useCallback, useRef } from 'react';
import { FlatList } from 'react-native';
import BackgroundTimer from 'react-native-background-timer';
import { format, addSeconds, setHours, setMinutes, setSeconds } from 'date-fns';
import MapView, { Polyline, PROVIDER_GOOGLE } from 'react-native-maps';

import { Position } from '../../native/GPSForegroundService';

import {
  Container,
  Timer,
  TimerContainer,
  ButtonContainer,
  StartButton,
  StartButtonText,
  StopButton,
  StopButtonText,
  ResetButton,
  ResetButtonText,
  StatisticsContainer,
  StatisticsHeader,
  StatisticsInfo,
  AverageDaily,
  AverageDailyHeader,
  AverageDailyInfoContainer,
  AverageDailyInfo,
  Separator,
  Total,
  TotalHeader,
  TotalInfoContainer,
  TotalInfo,
  Unit,
  RoutesListContainer,
  RouteListItem,
  RouteListItemDaily,
  RouteListItemDailyHeader,
  RouteListItemDailyInfoContainer,
  RouteListItemDailyInfo,
} from './styles';

interface IntervalValueRereference {
  value: number;
}

const Profile: React.FC = () => {
  const intervalRefValue = useRef<IntervalValueRereference>({ value: 0 });

  const [timer, setTimer] = useState<Date>(() => setHours(setMinutes(setSeconds(new Date(), 0), 0), 0));
  const [timerStarted, setTimeStarted] = useState<boolean>(false);
  const [routesCollection, setRoutesCollection] = useState<Routes[]>([
    { id: '1', positions: [{ latitude: 1, longitude: 1 }] },
    { id: '2', positions: [{ latitude: 1, longitude: 1 }] },
  ]);

  const startTimer = useCallback(() => {
    setTimeStarted(true);
    intervalRefValue.current.value = BackgroundTimer.setInterval(() => {
      setTimer((prevDate) => addSeconds(prevDate, 1));
    }, 1000);
  }, []);

  const stopTimer = useCallback(() => {
    BackgroundTimer.clearInterval(intervalRefValue.current.value);
    setTimeStarted(false);
  }, []);

  const resetTimer = useCallback(() => {
    setTimer(setHours(setMinutes(setSeconds(new Date(), 0), 0), 0));
  }, []);

  return (
    <Container>
      <TimerContainer>
        <Timer>{format(timer, 'HH:mm:ss')}</Timer>

        <ButtonContainer>
          {timerStarted ? (
            <StopButton onPress={() => stopTimer()}>
              <StopButtonText>Parar</StopButtonText>
            </StopButton>
          ) : (
            <StartButton onPress={() => startTimer()}>
              <StartButtonText>Iniciar</StartButtonText>
            </StartButton>
          )}

          <ResetButton onPress={() => resetTimer()}>
            <ResetButtonText>Reiniciar</ResetButtonText>
          </ResetButton>
        </ButtonContainer>
      </TimerContainer>

      <StatisticsContainer>
        <StatisticsHeader>Estatísticas</StatisticsHeader>
        <StatisticsInfo>
          <AverageDaily>
            <AverageDailyHeader>Dist. Média Diária</AverageDailyHeader>
            <AverageDailyInfoContainer>
              <AverageDailyInfo>1</AverageDailyInfo>
              <Unit>KMs</Unit>
            </AverageDailyInfoContainer>
          </AverageDaily>
          <Separator />
          <Total>
            <TotalHeader>Distância Total</TotalHeader>
            <TotalInfoContainer>
              <TotalInfo>1</TotalInfo>
              <Unit>KMs</Unit>
            </TotalInfoContainer>
          </Total>
        </StatisticsInfo>
      </StatisticsContainer>

      <RoutesListContainer>
        <FlatList
          horizontal
          data={routesCollection}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <RouteListItem>
              <RouteListItemDaily>
                <RouteListItemDailyHeader>Ontem</RouteListItemDailyHeader>
                <RouteListItemDailyInfoContainer>
                  <RouteListItemDailyInfo>8.2</RouteListItemDailyInfo>
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
                <Polyline coordinates={item.positions} strokeWidth={2.5} lineJoin="round" lineCap="butt" />
              </MapView>
            </RouteListItem>
          )}
        />
      </RoutesListContainer>
    </Container>
  );
};

export interface Routes {
  id: string;
  positions: Position[];
}

export default Profile;
