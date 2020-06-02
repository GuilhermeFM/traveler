import React, { useMemo } from 'react';

import {
  StatisticsContainer,
  StatisticsHeader,
  StatisticsInfo,
  AverageDaily,
  AverageDailyHeader,
  AverageDailyInfoContainer,
  AverageDailyInfo,
  Separator,
  Total,
  TotalHeader,
  TotalInfoContainer,
  TotalInfo,
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
      <StatisticsHeader>Estatísticas</StatisticsHeader>
      <StatisticsInfo>
        <AverageDaily>
          <AverageDailyHeader>Distância Média</AverageDailyHeader>
          <AverageDailyInfoContainer>
            <AverageDailyInfo>{formatedAverageDailyDistance}</AverageDailyInfo>
            <Unit>KMs</Unit>
          </AverageDailyInfoContainer>
        </AverageDaily>
        <Separator />
        <Total>
          <TotalHeader>Distância Total</TotalHeader>
          <TotalInfoContainer>
            <TotalInfo>{formatedTotalDistance}</TotalInfo>
            <Unit>KMs</Unit>
          </TotalInfoContainer>
        </Total>
      </StatisticsInfo>
    </StatisticsContainer>
  );
};

export default ExerciseStatistics;
