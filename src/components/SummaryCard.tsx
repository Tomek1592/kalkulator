import React from "react";

import { Row, Col, Icon } from 'antd';
import styled from 'styled-components';

const SummaryCardWrapper = styled('div')`
  width: 100%;
  height: 230px;
  padding: 30px;
  border-radius: 3px;
  background-color: #6bf178;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.15);
`;

const CustomIcon = styled(Icon)`
  font-size: 40px;
  color: #fff;
`;

const CustomText = styled('span')`
  font-size: 40px;
  margin-left: 5px;
  color: #fff;
`;

const Suffix = styled('span')`
  font-size: 25px;
  color: #fff;
  margin-left: 3px;
`;

const CustomTitle = styled('span')`
  color: #fff
`;

interface SummaryCardProps {
  sum: {
    withoutVat: number;
    vatSavings: number;
    totalSavings: number;
    total: number;
  };
}

const SummaryCard: React.FC<SummaryCardProps> = ({ sum }) => {
  const { withoutVat, vatSavings, totalSavings, total } = sum;

  return (
    <SummaryCardWrapper>
      <Row>
        <Col span={12}>
          <Row>
            <CustomIcon type="percentage" />
            <CustomText>{Math.round(vatSavings)}</CustomText>
            <Suffix>PLN</Suffix>
          </Row>
          <Row>
            <CustomTitle>Zaoszczędzone z VAT</CustomTitle>
          </Row>
        </Col>
        <Col span={12}>
          <Row>
            <CustomIcon type="percentage" />
            <CustomText>{Math.round(withoutVat)}</CustomText>
            <Suffix>PLN</Suffix>
          </Row>
          <Row>
            <CustomTitle>Do zapłacenie bez VAT</CustomTitle>
          </Row>
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <Row>
            <CustomIcon type="bank" />
            <CustomText>{Math.round(totalSavings)}</CustomText>
            <Suffix>PLN</Suffix>
          </Row>
          <Row>
            <CustomTitle>Łącznie zaoszczędzone</CustomTitle>
          </Row>
        </Col>
        <Col span={12}>
          <Row>
            <CustomIcon type="dollar" />
            <CustomText>{Math.round(total)}</CustomText>
            <Suffix>PLN</Suffix>
          </Row>
          <Row>
            <CustomTitle>Łącznie do zapłacenia</CustomTitle>
          </Row>
        </Col>
      </Row>
    </SummaryCardWrapper>
  );
};

export default SummaryCard;
