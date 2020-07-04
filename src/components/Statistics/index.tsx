import React, { useMemo } from 'react';

import StatistcsLoader from '../StatistcsLoader';

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
  loading: boolean;
}

const ExerciseStatistics: React.FC<ExerciseStatisticsProps> = ({
  loading,
  averageDailyDistance = 0,
  totalDistance = 0,
}) => {
  const formatedAverageDailyDistance = useMemo(
    () => new Intl.NumberFormat('pt-BR', { style: 'decimal', maximumFractionDigits: 2 }).format(averageDailyDistance),
    [averageDailyDistance],
  );

  const formatedTotalDistance = useMemo(
    () => new Intl.NumberFormat('pt-BR', { style: 'decimal', maximumFractionDigits: 2 }).format(totalDistance),
    [totalDistance],
  );

  return (
    <StatisticsContainer>
      {loading ? (
        <StatistcsLoader />
      ) : (
        <>
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
        </>
      )}
    </StatisticsContainer>
  );
};

export default ExerciseStatistics;
