import * as React from 'react';

import { Row, Col } from 'antd';

import ProfitForm from '../components/ProfitForm';

const Profit = (): JSX.Element => {
  return (
    <Row align="middle" justify="center">
      <Col xs={24} sm={22} md={18} lg={12} xl={12} xxl={12}>
        <ProfitForm />
      </Col>
    </Row>
  );
};

export default Profit;
