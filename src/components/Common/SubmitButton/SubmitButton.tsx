import React, { FC } from 'react';

import { Row, Col } from 'antd';

import * as S from './styles';

const SubmitButton: FC = () => {
  return (
    <Row align="middle" justify="center">
      <Col xs={24} sm={20} md={16} lg={12} xl={8} xxl={8}>
        <S.CustomButton type="primary" htmlType="submit">
          Oblicz
        </S.CustomButton>
      </Col>
    </Row>
  );
};

export default SubmitButton;
