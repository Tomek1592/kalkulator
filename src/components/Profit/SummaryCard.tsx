import React from "react";

import { Row, Col, Icon } from 'antd';
import styled from 'styled-components';

const SummaryCardWrapper = styled('div')`
  width: 100%;
  padding: 25px;
  margin-bottom: 40px;
  border-radius: 3px;
  background-color: #06d6a0;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.15);
`;

const CustomIcon = styled(Icon)`
  font-size: 25px;
  color: #fff;
`;

const CustomText = styled('span')`
  font-size: 25px;
  margin-left: 5px;
  color: #fff;
`;

const Suffix = styled('span')`
  font-size: 15px;
  color: #fff;
  margin-left: 3px;
`;

const CustomTitle = styled('span')`
  color: #fff
`;

interface SummaryCardProps {
  total: number
}

const SummaryCard: React.FC<SummaryCardProps> = ({ total }) => {
  return (
    <SummaryCardWrapper>
      <Row>
        <Col span={12}>
          <Row>
            <CustomIcon type="dollar" />
            <CustomText>{Math.round(total)}</CustomText>
            <Suffix>PLN</Suffix>
          </Row>
          <Row>
            <CustomTitle>Twój przychód</CustomTitle>
          </Row>
        </Col>
      </Row>
    </SummaryCardWrapper>
  );
};

export default SummaryCard;
