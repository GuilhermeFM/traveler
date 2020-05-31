import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #232a44;

  padding: 0 20px 0 20px;
  margin-top: 35px;
`;

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

export const Timer = styled.Text`
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

export const RoutesListContainer = styled.View`
  flex: 1.5;
`;

export const RouteListItemDaily = styled.View`
  height: 50%;
  justify-content: center;
  margin-left: 20px;
`;

export const RouteListItemDailyHeader = styled.Text`
  color: #a1a4b0;
  font-size: 15px;
`;

export const RouteListItemDailyInfoContainer = styled.View`
  flex-direction: row;
  align-items: baseline;
`;

export const RouteListItemDailyInfo = styled.Text`
  color: #fcfcfc;
  font-size: 30px;
`;

export const RouteListItem = styled.View`
  width: 300px;
  height: 200px;

  margin: 0 10px 0 10px;

  background-color: #424966;
  border-radius: 20px;
  overflow: hidden;
`;
