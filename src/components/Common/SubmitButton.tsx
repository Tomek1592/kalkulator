import React, { FC } from 'react';
import { isMobile } from 'react-device-detect';

import styled from 'styled-components';

import { Button } from 'antd';

interface FormProps {
  width?: string;
}

const CustomButton = styled(Button)`
  height: 50px !important;
  width: ${(props: FormProps) => (props.width ? props.width : '100%')};

  span {
    font-size: 20px;
  }
`;

const SubmitButton: FC = () => {
  return (
    <CustomButton
      type="primary"
      htmlType="submit"
      width={isMobile ? '100%' : '10%'}
    >
      Oblicz
    </CustomButton>
  );
};

export default SubmitButton;
