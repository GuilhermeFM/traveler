import styled from 'styled-components/native';

export const TimerContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const ButtonContainer = styled.View`
  justify-content: center;
  align-items: center;
  flex-direction: row;

  margin-top: 15px;
`;

export const TimerText = styled.Text`
  font-size: 56px;
  color: #a8abbb;
`;

export const StartButton = styled.TouchableOpacity`
  width: 140px;
  height: 48px;

  justify-content: center;
  align-items: center;

  padding: 10px;
  border-radius: 24px;
  background-color: #424966;

  margin-right: 5px;
`;

export const StartButtonText = styled.Text`
  color: #a8abbb;
  font-size: 18px;
`;

export const StopButton = styled.TouchableOpacity`
  width: 140px;
  height: 48px;

  justify-content: center;
  align-items: center;

  padding: 10px;
  border-radius: 24px;
  background-color: #424966;

  margin-right: 5px;
`;

export const StopButtonText = styled.Text`
  color: #a8abbb;
  font-size: 18px;
`;

export const ResetButton = styled.TouchableOpacity`
  width: 140px;
  height: 48px;

  justify-content: center;
  align-items: center;

  padding: 10px;
  border-radius: 24px;
  background-color: #424966;

  margin-left: 5px;
`;

export const ResetButtonText = styled.Text`
  color: #a8abbb;
  font-size: 18px;
`;
