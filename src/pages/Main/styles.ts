import styled from 'styled-components/native';
import { FlatList } from 'react-native';
import { scale, verticalScale } from '../../utils/Scaler';

export const Container = styled.View`
  flex: 1;
  justify-content: space-evenly;
  padding: 0 ${scale(20)}px 0 ${scale(20)}px;
`;

export const TravelContainer = styled.View`
  flex-grow: 0;
`;

export const TravelHeader = styled.Text`
  align-self: flex-start;

  text-align: left;
  font-size: ${verticalScale(15)}px;
  font-weight: bold;
  color: #fff;
`;

export const TravelList = styled(FlatList)`
  margin-top: ${verticalScale(20)}px;
  margin-left: ${scale(15)}px;
`;
