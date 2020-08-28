import styled from 'styled-components';

export const SummaryCardWrapper = styled('div')`
  width: 100%;
  padding: 25px;
  border-radius: 3px;
`;

export const DoughnutWrapper = styled('div')`
  margin-bottom: 50px;
`;

export const ResultWrapper = styled('div')`
  display: grid;
  grid-template-columns: 50% 50%;
  grid-template-rows: 115px 115px;
  grid-column-gap: 10px;
  grid-row-gap: 10px;
`;

export const ResultTile = styled('div')`
  border: 1px solid #e8e8e8;
  border-radius: 3px;
  background: #eff7f6;
  padding: 7px;
  margin-bottom: 5px;
`;

export const Circle = styled('div')`
  background: ${(props) => props.color};
  width: 10px;
  height: 10px;
  border-radius: 50px;
  margin-right: 3px;
`;

export const HeaderWrapper = styled('div')`
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

export const ContentWrapper = styled('div')`
  display: flex;
  justify-content: center;
  margin-top: 10px;
`;

export const FooterWrapper = styled('div')`
  display: flex;
  justify-content: center;
`;

export const LabelText = styled('span')`
  font-size: 10px;
`;
