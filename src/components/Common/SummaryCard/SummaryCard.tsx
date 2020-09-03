import React from 'react';

import { Doughnut } from 'react-chartjs-2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Props } from './types';
import * as S from './styles';

const SummaryCard = (props: Props): JSX.Element => {
  const { data } = props;
  const chartData = {
    datasets: [
      {
        labels: data.map((el) => el.label),
        data: data.map((el) => el.value),
        backgroundColor: data.map((el) => el.color),
      },
    ],
  };

  return (
    <S.SummaryCardWrapper>
      <S.DoughnutWrapper>
        <Doughnut data={chartData} />
      </S.DoughnutWrapper>
      <S.ResultWrapper>
        {data.map((el) => (
          <S.ResultTile key={el.id}>
            <S.HeaderWrapper>
              <S.Circle color={el.color} />
              <span>{el.value}</span>
              <span>zł</span>
            </S.HeaderWrapper>
            <S.ContentWrapper>
              <FontAwesomeIcon icon={el.icon} size="3x" />
            </S.ContentWrapper>
            <S.FooterWrapper>
              <S.LabelText>{el.label}</S.LabelText>
            </S.FooterWrapper>
          </S.ResultTile>
        ))}
      </S.ResultWrapper>
    </S.SummaryCardWrapper>
  );
};

export default SummaryCard;
