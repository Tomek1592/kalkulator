import React, { FC } from 'react';

import { Row, Col } from 'antd';
import styled from 'styled-components';

import { Button } from 'antd';

const CustomButton = styled(Button)`
  height: 45px !important;
  width: 100%;

  span {
    font-size: 20px;
  }
`;

const SubmitButton: FC = () => {
  return (
    <Row align="middle" justify="center">
      <Col xs={24} sm={20} md={16} lg={12} xl={8} xxl={8}>
        <CustomButton type="primary" htmlType="submit">
          Oblicz
        </CustomButton>
      </Col>
    </Row>
  );
};

export default SubmitButton;
