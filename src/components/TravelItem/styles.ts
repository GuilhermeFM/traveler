import styled from 'styled-components/native';
import { scale, verticalScale } from '../../utils/Scaler';

export const TravelInfoContainer = styled.View`
  height: 40%;
  justify-content: center;
  margin-left: ${scale(20)}px;
`;

export const TravelDate = styled.Text`
  color: #a1a4b0;
  font-size: ${verticalScale(15)}px;
`;

export const TravelDistanceContainer = styled.View`
  flex-direction: row;
  align-items: baseline;
`;

export const TravelDistanceText = styled.Text`
  color: #fcfcfc;
  font-size: ${verticalScale(30)}px;
`;

export const Unit = styled.Text`
  color: #a1a4b0;
  margin-left: ${scale(5)}px;
  padding-bottom: ${verticalScale(5)}px;
  font-size: ${verticalScale(15)}px;
`;
