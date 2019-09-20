import React, { useState } from 'react';

import { Form, InputNumber, Select, Button } from 'antd';
import styled from 'styled-components';

import SummaryCard from "./SummaryCard";

const CustomFormWrapper = styled(Form)`
  margin-top: 40px;
`;

const CustomForm: React.FC = () => {
  const style = { width: '100%' };

  const [price, setPrice] = useState(0);
  const [vat, setVat] = useState(1.23);
  const [income, setIncome] = useState(0.82);
  const [sum, setSum] = useState({
    withoutVat: 0,
    vatSavings: 0,
    totalSavings: 0,
    total: 0
  });
  const [showSummary, setShowSummary] = useState(false);

  const handleChangePrice = (value: any) => {
    setPrice(value);
  };

  const handleChangeVat = (value: number) => {
    setVat(value);
  };

  const handleChangeIncome = (value: number) => {
    setIncome(value);
  };

  // price: 100
  // withoutVat: 100/23% = 81,3
  // vatSavings: 100 - withoutVat = 18,7
  // total: withoutVat * 18% = 66,67
  // totalSavings: 100 - total = 33,33

  const submitForm = (e: any) => {
    const withoutVat = vat > 0 ? price / vat : 0;
    const vatSavings = price - withoutVat;
    const total = vat > 0 ? withoutVat * income : price * income;
    const totalSavings = price - total;

    setShowSummary(false);
    e.preventDefault();
    setSum({ withoutVat, vatSavings, totalSavings, total });
    setShowSummary(true);
  };

  return (
    <>
      {/*{showSummary && <SummaryCard sum={sum} />}*/}
      <SummaryCard sum={sum} />
      <CustomFormWrapper onSubmit={submitForm}>
        <Form.Item label="Kwota">
          <InputNumber
            value={price}
            defaultValue={0}
            min={0}
            max={10000}
            style={style}
            onChange={handleChangePrice}
          />
        </Form.Item>
        <Form.Item label="Stawka VAT">
          <Select defaultValue={1.23} style={style} onChange={handleChangeVat}>
            <Select.Option value={0}>0%</Select.Option>
            <Select.Option value={1.08}>8%</Select.Option>
            <Select.Option value={1.23}>23%</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="Podatek dochodowy">
          <Select defaultValue={0.82} style={style} onChange={handleChangeIncome}>
            <Select.Option value={0.82}>18%</Select.Option>
            <Select.Option value={0.81}>19%</Select.Option>
            <Select.Option value={0.68}>32%</Select.Option>
          </Select>
        </Form.Item>
        <Button type="primary" htmlType="submit">
          Oblicz
        </Button>
      </CustomFormWrapper>
    </>
  )
};

export default CustomForm;
