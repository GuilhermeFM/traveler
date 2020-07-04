import styled from 'styled-components/native';
import { scale, verticalScale } from '../../utils/Scaler';

export const Container = styled.View`
  flex: 1;
  padding: 0 ${scale(20)}px 0 ${scale(20)}px;
`;

export const TravelContainer = styled.View`
  flex: 1.25;
  margin-bottom: ${verticalScale(15)}px;
`;

export const TravelHeader = styled.Text`
  align-self: flex-start;

  text-align: left;
  font-size: ${verticalScale(15)}px;
  font-weight: bold;
  color: #fff;
`;
