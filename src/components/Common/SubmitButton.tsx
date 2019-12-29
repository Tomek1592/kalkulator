import React, { FC } from "react";
import styled from "styled-components";
import { Button } from "antd";

const CustomButton = styled(Button)`
  width: 100%;
  height: 50px !important;
  
  span {
    font-size: 20px;
  }
`;

const SubmitButton: FC = () => {
  return (
    <CustomButton type="primary" htmlType="submit">
      Oblicz
    </CustomButton>
  )
};

export default SubmitButton;
