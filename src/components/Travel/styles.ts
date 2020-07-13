import styled from 'styled-components/native';

import { scale, verticalScale } from '../../utils/Scaler';

export const EmptyTravelList = styled.View`
  width: ${scale(280)}px;
  margin-right: ${scale(10)}px;

  justify-content: center;
  align-items: center;
`;

export const EmptyTravelText = styled.Text`
  color: #a1a4b0;
  font-size: ${verticalScale(15)}px;
`;
