import styled from 'styled-components/native';
import { scale } from '../../utils/Scaler';

export const TravelItem = styled.View`
  width: ${scale(280)}px;
  height: ${scale(180)}px;

  background-color: #424966;
  border-radius: 20px;
  overflow: hidden;

  margin-right: ${scale(10)}px;
`;

export const TravelInfoContainer = styled.View`
  height: 45%;
  justify-content: center;
  margin-left: ${scale(20)}px;
`;

export const RouteListItemDailyHeader = styled.Text`
  color: #a1a4b0;
  font-size: ${scale(15)}px;
`;

export const RouteListItemDailyInfoContainer = styled.View`
  flex-direction: row;
  align-items: baseline;
`;

export const RouteListItemDailyInfo = styled.Text`
  color: #fcfcfc;
  font-size: ${scale(30)}px;
`;

export const Unit = styled.Text`
  color: #a1a4b0;
  margin-left: ${scale(5)}px;
  padding-bottom: ${scale(5)}px;
`;
