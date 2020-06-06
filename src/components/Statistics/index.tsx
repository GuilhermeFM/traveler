import React, { useMemo } from 'react';

import {
  StatisticsContainer,
  StatisticsHeader,
  StatisticsInfo,
  Header,
  Info,
  AverageDaily,
  AverageDailyInfoContainer,
  Total,
  TotalInfoContainer,
  Unit,
} from './styles';

interface ExerciseStatisticsProps {
  averageDailyDistance: number;
  totalDistance: number;
}

const ExerciseStatistics: React.FC<ExerciseStatisticsProps> = ({ averageDailyDistance = 0, totalDistance = 0 }) => {
  const formatedAverageDailyDistance = useMemo(
    () => new Intl.NumberFormat('pt-BR', { style: 'decimal' }).format(averageDailyDistance),
    [averageDailyDistance],
  );

  const formatedTotalDistance = useMemo(
    () => new Intl.NumberFormat('pt-BR', { style: 'decimal' }).format(totalDistance),
    [totalDistance],
  );

  return (
    <StatisticsContainer>
      <StatisticsHeader>ESTATÍSTICAS</StatisticsHeader>
      <StatisticsInfo>
        <AverageDaily>
          <Header>Distância Média</Header>
          <AverageDailyInfoContainer>
            <Info>{formatedAverageDailyDistance}</Info>
            <Unit>KMs</Unit>
          </AverageDailyInfoContainer>
        </AverageDaily>
        <Total>
          <Header>Distância Total</Header>
          <TotalInfoContainer>
            <Info>{formatedTotalDistance}</Info>
            <Unit>KMs</Unit>
          </TotalInfoContainer>
        </Total>
      </StatisticsInfo>
    </StatisticsContainer>
  );
};

export default ExerciseStatistics;
