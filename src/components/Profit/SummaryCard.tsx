import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCut, faWallet, faGopuram } from '@fortawesome/free-solid-svg-icons';
import {Doughnut} from "react-chartjs-2";
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
  total: {
    pit36: number,
    cleanIncome: number,
    ZUS: number
  }
}

const SummaryCard: React.FC<SummaryCardProps> = ({ total }) => {
  const { pit36, cleanIncome, ZUS } = total;
  const colors = {
    pit36: '#FF6384',
    cleanIncome: '#36A2EB',
    ZUS: '#FFCE56'
  };
  const data = {
    datasets: [{
      labels: ['Podatek dochodowy', 'Kwota "na rękę"', 'Składka ZUS'],
      data: [pit36, cleanIncome, ZUS],
      backgroundColor: [
        colors['pit36'],
        colors['cleanIncome'],
        colors['ZUS']
      ],
      hoverBackgroundColor: [
        colors['pit36'],
        colors['cleanIncome'],
        colors['ZUS']
      ]
    }]
  };

  return (
    <SummaryCardWrapper>
      <DoughnutWrapper>
        <Doughnut data={data} />
      </DoughnutWrapper>
      <ResultWrapper>
        <ResultTile>
          <HeaderWrapper>
            <Circle color={colors.cleanIncome} />
            <span>{cleanIncome}</span>
            <span>zł</span>
          </HeaderWrapper>
          <ContentWrapper>
            <FontAwesomeIcon icon={faWallet} size="3x" />
          </ContentWrapper>
          <FooterWrapper>
            <LabelText>Kwota na rękę</LabelText>
          </FooterWrapper>
        </ResultTile>
        <ResultTile>
          <HeaderWrapper>
            <Circle color={colors.pit36} />
            <span>{pit36}</span>
            <span>zł</span>
          </HeaderWrapper>
          <ContentWrapper>
            <FontAwesomeIcon icon={faCut} size="3x" />
          </ContentWrapper>
          <FooterWrapper>
            <LabelText>Podatek dochodowy</LabelText>
          </FooterWrapper>
        </ResultTile>
        <ResultTile>
          <HeaderWrapper>
            <Circle color={colors.ZUS} />
            <span>{ZUS}</span>
            <span>zł</span>
          </HeaderWrapper>
          <ContentWrapper>
            <FontAwesomeIcon icon={faGopuram} size="3x" />
          </ContentWrapper>
          <FooterWrapper>
            <LabelText>Składka ZUS</LabelText>
          </FooterWrapper>
        </ResultTile>
      </ResultWrapper>
    </SummaryCardWrapper>
  );
};

export default SummaryCard;
