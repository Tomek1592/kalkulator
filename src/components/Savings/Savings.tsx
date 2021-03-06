import React, { FC } from 'react';

import { Row, Col } from 'antd';

import SavingsForm from './SavingsForm';

const Savings: FC = () => {
  return (
    <Row align="middle" justify="center">
      <Col xs={24} sm={22} md={18} lg={12} xl={12} xxl={12}>
        <SavingsForm />
      </Col>
    </Row>
  );
};

export default Savings;
