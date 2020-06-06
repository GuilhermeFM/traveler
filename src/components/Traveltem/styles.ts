import styled from 'styled-components/native';
import { scale, verticalScale } from '../../utils/Scaler';

export const TravelItem = styled.View`
  width: ${scale(280)}px;
  height: ${verticalScale(220)}px;

  background-color: #424966;
  border-radius: 20px;
  overflow: hidden;

  margin-right: ${scale(10)}px;
`;

export const TravelInfoContainer = styled.View`
  height: 40%;
  justify-content: center;
  margin-left: ${verticalScale(20)}px;
`;

export const RouteListItemDailyHeader = styled.Text`
  color: #a1a4b0;
  font-size: ${verticalScale(15)}px;
`;

export const RouteListItemDailyInfoContainer = styled.View`
  flex-direction: row;
  align-items: baseline;
`;

export const RouteListItemDailyInfo = styled.Text`
  color: #fcfcfc;
  font-size: ${verticalScale(30)}px;
`;

export const Unit = styled.Text`
  color: #a1a4b0;
  margin-left: ${scale(5)}px;
  padding-bottom: ${verticalScale(5)}px;
`;
