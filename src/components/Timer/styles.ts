import styled from 'styled-components/native';
import { scale, verticalScale } from '../../utils/Scaler';

export const TimerContainer = styled.View`
  align-items: center;
`;

export const TimerText = styled.Text`
  font-size: ${verticalScale(56)}px;
  color: #a8abbb;

  margin-bottom: ${verticalScale(20)}px;
`;

export const ButtonContainer = styled.View`
  flex-direction: row;
  align-self: stretch;
  justify-content: space-evenly;
`;

export const Button = styled.TouchableOpacity`
  width: ${scale(140)}px;
  height: ${verticalScale(50)}px;

  border-radius: ${scale(25)}px;
  background-color: #424966;

  justify-content: center;
  align-items: center;
`;

export const ButtonText = styled.Text`
  color: #a8abbb;
  font-size: ${verticalScale(16)}px;
`;
