import styled from 'styled-components/native';
import { scale } from '../../utils/Scaler';

export const StatisticsContainer = styled.View`
  width: 100%;
`;

export const StatisticsHeader = styled.Text`
  align-self: flex-start;

  text-align: left;
  font-size: ${scale(15)}px;
  font-weight: bold;
  color: #fff;
`;

export const StatisticsInfo = styled.View`
  height: ${scale(60)}px;

  align-self: stretch;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  margin-top: ${scale(20)}px;
  padding: 0 ${scale(20)}px 0 ${scale(20)}px;
`;

export const Header = styled.Text`
  color: #a1a4b0;
  font-size: ${scale(15)}px;
`;

export const Info = styled.Text`
  color: #fcfcfc;
  font-size: ${scale(30)}px;
`;

export const AverageDaily = styled.View`
  flex: 1;
  border-right-width: 0.5px;
  border-right-color: #383f5b;

  padding-right: ${scale(15)}px;
`;

export const AverageDailyInfoContainer = styled.View`
  flex-direction: row;
  align-items: baseline;
`;

export const Total = styled.View`
  flex: 1;
  border-left-width: 0.5px;
  border-left-color: #383f5b;

  padding-left: ${scale(15)}px;
`;

export const TotalInfoContainer = styled.View`
  flex-direction: row;
  align-items: baseline;
`;

export const Unit = styled.Text`
  color: #a1a4b0;
  margin-left: ${scale(5)}px;
  padding-bottom: ${scale(5)}px;
  font-size: ${scale(13)}px;
`;
