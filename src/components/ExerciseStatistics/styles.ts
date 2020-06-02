import styled from 'styled-components/native';

export const StatisticsContainer = styled.View`
  flex: 1;
  align-items: center;
  width: 100%;

  margin-top: 30px;
`;

export const StatisticsHeader = styled.Text`
  width: 100%;

  text-align: left;
  font-size: 18px;
  font-weight: bold;
  color: #fff;
`;

export const StatisticsInfo = styled.View`
  height: 60px;

  flex-direction: row;
  justify-content: center;
  align-items: center;

  margin-top: 20px;
  padding: 0 20px 0 20px;
`;

export const AverageDaily = styled.View`
  flex: 1;
`;

export const AverageDailyHeader = styled.Text`
  color: #a1a4b0;
  font-size: 15px;
`;

export const AverageDailyInfoContainer = styled.View`
  flex-direction: row;
  align-items: baseline;
`;

export const AverageDailyInfo = styled.Text`
  color: #fcfcfc;
  font-size: 30px;
`;

export const Separator = styled.View`
  width: 0.5px;
  height: 100%;
  background-color: #383f5b;

  margin: 0 15px 0 15px;
`;

export const Total = styled.View`
  flex: 1;
`;

export const TotalHeader = styled.Text`
  color: #a1a4b0;
  font-size: 15px;
`;

export const TotalInfoContainer = styled.View`
  flex-direction: row;
  align-items: baseline;
`;

export const TotalInfo = styled.Text`
  color: #fcfcfc;
  font-size: 30px;
`;

export const Unit = styled.Text`
  margin-left: 5px;
  color: #a1a4b0;
  padding-bottom: 5px;
`;
