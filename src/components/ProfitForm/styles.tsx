import styled from 'styled-components';
import { Form, Radio } from 'antd';

export const FormItem = styled(Form.Item)`
  border: 1px solid #e8e8e8;
  padding: 10px !important;
  margin-bottom: 10px !important;
  border-radius: 3px;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.15);
`;

export const PeriodRadioGroup = styled(Radio.Group)`
  && {
    margin-bottom: 10px;
    width: 100%;

    label {
      width: 50%;
      text-align: center;
    }
  }
`;
