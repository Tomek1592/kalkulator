import React from 'react';
import { Doughnut } from 'react-chartjs-2';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

import styled from 'styled-components';

const SummaryCardWrapper = styled('div')`
  width: 100%;
  padding: 25px;
  border-radius: 3px;
`;

const DoughnutWrapper = styled('div')`
  margin-bottom: 50px;
`;

const ResultWrapper = styled('div')`
  display: grid;
  grid-template-columns: 50% 50%;
  grid-template-rows: 115px 115px;
  grid-column-gap: 10px;
  grid-row-gap: 10px;
`;

const ResultTile = styled('div')`
  border: 1px solid #e8e8e8;
  border-radius: 3px;
  background: #eff7f6;
  padding: 7px;
  margin-bottom: 5px;
`;

const Circle = styled('div')`
  background: ${props => props.color};
  width: 10px;
  height: 10px;
  border-radius: 50px;
  margin-right: 3px;
`;

const HeaderWrapper = styled('div')`
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

const ContentWrapper = styled('div')`
  display: flex;
  justify-content: center;
  margin-top: 10px;
`;

const FooterWrapper = styled('div')`
  display: flex;
  justify-content: center;
`;

const LabelText = styled('span')`
  font-size: 10px;
`;

interface SummaryCardProps {
  data: {
    id: string;
    label: string;
    value: number;
    color: string;
    icon: IconDefinition;
  }[];
}

const SummaryCard: React.FC<SummaryCardProps> = ({ data }) => {
  const chartData = {
    datasets: [
      {
        labels: data.map(el => el.label),
        data: data.map(el => el.value),
        backgroundColor: data.map(el => el.color)
      }
    ]
  };

  return (
    <SummaryCardWrapper>
      <DoughnutWrapper>
        <Doughnut data={chartData} />
      </DoughnutWrapper>
      <ResultWrapper>
        {data.map(el => (
          <ResultTile key={el.id}>
            <HeaderWrapper>
              <Circle color={el.color} />
              <span>{el.value}</span>
              <span>zł</span>
            </HeaderWrapper>
            <ContentWrapper>
              <FontAwesomeIcon icon={el.icon} size="3x" />
            </ContentWrapper>
            <FooterWrapper>
              <LabelText>{el.label}</LabelText>
            </FooterWrapper>
          </ResultTile>
        ))}
      </ResultWrapper>
    </SummaryCardWrapper>
  );
};

export default SummaryCard;
