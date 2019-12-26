import React, { FC, useState } from 'react';

import { Form, InputNumber, Button, Radio } from 'antd';

import SummaryCard from "./SummaryCard";

const SavingsForm: FC = () => {
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

  const handleChangeVat = (e: any) => {
    setVat(e.target.value);
  };

  const handleChangeIncome = (e: any) => {
    setIncome(e.target.value);
  };

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
      {showSummary && <SummaryCard sum={sum} />}
      <Form onSubmit={submitForm}>
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
          <Radio.Group
            defaultValue={1.23}
            style={style}
            onChange={(e) => handleChangeVat(e)}
            buttonStyle="solid"
          >
            <Radio.Button value={0}>0%</Radio.Button>
            <Radio.Button value={1.08}>8%</Radio.Button>
            <Radio.Button value={1.23}>23%</Radio.Button>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="Podatek dochodowy">
          <Radio.Group
            defaultValue={0.83}
            style={style}
            onChange={(e) => handleChangeIncome(e)}
            buttonStyle="solid"
          >
            <Radio.Button value={0.83}>17%</Radio.Button>
            <Radio.Button value={0.81}>19%</Radio.Button>
            <Radio.Button value={0.68}>32%</Radio.Button>
          </Radio.Group>
        </Form.Item>
        <Button type="primary" htmlType="submit">
          Oblicz
        </Button>
      </Form>
    </>
  )
};

export default SavingsForm;
