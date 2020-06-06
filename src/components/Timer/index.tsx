import React, { useRef, useState, useCallback } from 'react';
import { format, addSeconds, setHours, setMinutes, setSeconds } from 'date-fns';
import BackgroundTimer from 'react-native-background-timer';

import { TimerContainer, TimerText, ButtonContainer, Button, ButtonText } from './styles';

interface TimerProps {
  onTimerStart(): void;
  onTimerStop(): void;
  onTimerReset(): void;
}

interface IValueReference {
  value: number;
}

const Timer: React.FC<TimerProps> = ({ onTimerStart, onTimerStop, onTimerReset }) => {
  const intervalRefValue = useRef<IValueReference>({ value: 0 });

  const [timerStarted, setTimerStarted] = useState<boolean>(false);
  const [timer, setTimer] = useState<Date>(() => setHours(setMinutes(setSeconds(new Date(), 0), 0), 0));

  const startTimer = useCallback(() => {
    setTimerStarted(true);
    intervalRefValue.current.value = BackgroundTimer.setInterval(
      () => setTimer((prevState) => addSeconds(prevState, 1)),
      1000,
    );
    onTimerStart();
  }, [onTimerStart]);

  const stopTimer = useCallback(() => {
    onTimerStop();
    BackgroundTimer.clearInterval(intervalRefValue.current.value);
    setTimerStarted(false);
  }, [onTimerStop]);

  const resetTimer = useCallback(() => {
    onTimerReset();
    setTimer(setHours(setMinutes(setSeconds(new Date(), 0), 0), 0));
  }, [onTimerReset]);

  return (
    <TimerContainer>
      <TimerText>{format(timer, 'HH:mm:ss')}</TimerText>

      <ButtonContainer>
        {timerStarted ? (
          <Button onPress={() => stopTimer()}>
            <ButtonText>Parar</ButtonText>
          </Button>
        ) : (
          <Button onPress={() => startTimer()}>
            <ButtonText>Iniciar</ButtonText>
          </Button>
        )}

        <Button onPress={() => resetTimer()}>
          <ButtonText>Reiniciar</ButtonText>
        </Button>
      </ButtonContainer>
    </TimerContainer>
  );
};

export default Timer;
