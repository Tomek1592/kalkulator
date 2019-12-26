import React, { FC, useState } from 'react';

import { Checkbox, Form, InputNumber, Button, Radio } from 'antd';

import SummaryCard from './SummaryCard';

// ((8000 - 213,57)*17%)-294,76
const INSURANCE = {
  OLDAGE: 131.76,  // emerytalne
  PENSION: 54,     // rentowe
  ACCIDENT: 11.27, // wypadkowe
  SICK: 16.54,     // chorobowe
  HEALTH: 342.32   // zdrowotne
};
const ZUS_RATES = {
  LEVEL0: 342.32,
  LEVEL1: 539.35,
  LEVEL2: 1246.92
};

const ProfitForm: FC = () => {
  const style = { width: '100%' };
  const defaultZUS = ZUS_RATES.LEVEL1;
  const defaultIncomeTax = 0.17;
  const ZUStypes = [
    { id: 'zus-type-1', value: ZUS_RATES.LEVEL0, description: 'Ulga na start' },
    { id: 'zus-type-2', value: ZUS_RATES.LEVEL1, description: 'Mały ZUS' },
    { id: 'zus-type-3', value: ZUS_RATES.LEVEL2, description: 'Normalny ZUS' }
  ];

  const [income, setIncome] = useState(0);
  const [incomeTax, setIncomeTax] = useState(defaultIncomeTax);
  const [ZUS, setZUS] = useState(defaultZUS);
  const [total, setTotal] = useState(0);
  const [showSummary, setShowSummary] = useState(false);
  const [sickInsurance, setSickInsurance] = useState(true);

  const handleChangeIncome = (value: any) => {
    setIncome(value);
  };

  const handleChangeIncomeTax = (e: any) => {
    setIncomeTax(e.target.value);
  };

  const handleChangeZUS = (e: any) => {
    setZUS(e.target.value);
  };

  const handleChangeSickInsurance = (e: any) => {
    setSickInsurance(e.target.value);
  };

  const submitForm = (e: any) => {
    setTotal(0);
    let basicInsurance = INSURANCE.OLDAGE + INSURANCE.PENSION + INSURANCE.ACCIDENT;

    if (sickInsurance) {
      basicInsurance += INSURANCE.SICK;
    }

    const totalHealth = (INSURANCE.HEALTH * 0.0775) / 0.09;
    let pit36 = Math.round(((income - basicInsurance) * incomeTax)) - totalHealth;

    setShowSummary(false);
    e.preventDefault();
    setTotal(Math.round(income - pit36 - ZUS));
    setShowSummary(true);
  };

  return (
    <>
      {showSummary && <SummaryCard total={total} />}
      <Form onSubmit={submitForm}>
        <Form.Item label="Kwota">
          <InputNumber
            value={income}
            defaultValue={0}
            min={0}
            max={1000000}
            style={style}
            onChange={handleChangeIncome}
          />
        </Form.Item>
        <Form.Item label="Podatek dochodowy">
          <Radio.Group
            defaultValue={defaultIncomeTax}
            style={style}
            onChange={(e) => handleChangeIncomeTax(e)}
            buttonStyle="solid"
          >
            <Radio.Button value={0.17}>17%</Radio.Button>
            <Radio.Button value={0.19}>19%</Radio.Button>
            <Radio.Button value={0.32}>32%</Radio.Button>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="Składki ZUS">
          <Radio.Group
            defaultValue={defaultZUS}
            style={style}
            onChange={(e) => handleChangeZUS(e)}
            buttonStyle="solid"
          >
            {ZUStypes.map(type => (
              <Radio.Button key={type.id} value={type.value}>
                {type.description}
              </Radio.Button>
            ))}
          </Radio.Group>
        </Form.Item>
        <Form.Item>
          <Checkbox
            defaultChecked={sickInsurance}
            onChange={handleChangeSickInsurance}
          >
            Składka chorobowa?
          </Checkbox>
        </Form.Item>
        <Button type="primary" htmlType="submit">
          Oblicz
        </Button>
      </Form>
    </>
  )
};

export default ProfitForm;
