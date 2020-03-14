import React, { FC, useState } from 'react';
import { Checkbox, Drawer, Form, InputNumber, Radio } from 'antd';
import { faCut, faWallet, faGopuram } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';

import SummaryCard from '../Common/SummaryCard';
import SubmitButton from '../Common/SubmitButton';

const FormItem = styled(Form.Item)`
  border: 1px solid #e8e8e8;
  padding: 10px !important;
  margin-bottom: 10px !important;
  border-radius: 3px;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.15);
`;

const INSURANCE = {
  OLDAGE: 152.26, // emerytalne
  PENSION: 62.4, // rentowe
  ACCIDENT: 13.03, // wypadkowe
  SICK: 19.11, // chorobowe
  HEALTH: 342.32 // zdrowotne
};
const ZUS_RATES = {
  LEVEL0: 362.34,
  LEVEL1: 590.03,
  LEVEL2: 1354.64
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
  const [total, setTotal] = useState({ pit36: 0, cleanIncome: 0, ZUS: 0 });
  const [sickInsurance, setSickInsurance] = useState(true);
  const [resultDrawer, setResultDrawer] = useState(false);

  const handleChangeIncome = (value: any) => {
    setIncome(value);
  };

  const handleChangeIncomeTax = (e: any) => {
    setIncomeTax(e.target.value);
  };

  const handleChangeZUS = (e: any) => {
    setZUS(e.target.value);
  };

  const handleChangeSickInsurance = () => {
    setSickInsurance(!sickInsurance);
  };

  const submitForm = (e: any) => {
    setTotal({ pit36: 0, cleanIncome: 0, ZUS: 0 });

    const totalHealth = (INSURANCE.HEALTH * 0.0775) / 0.09;
    let basicInsurance =
      INSURANCE.OLDAGE + INSURANCE.PENSION + INSURANCE.ACCIDENT;
    let totalZUS = ZUS;

    if (sickInsurance) {
      totalZUS += INSURANCE.SICK;
      basicInsurance += INSURANCE.SICK;
    }

    let pit36 = Math.round((income - basicInsurance) * incomeTax) - totalHealth;

    setResultDrawer(false);
    e.preventDefault();
    setTotal({
      pit36: Math.round(pit36),
      cleanIncome: Math.round(income - pit36 - totalZUS),
      ZUS: Math.round(totalZUS)
    });
    setResultDrawer(true);
  };

  return (
    <>
      <Drawer
        placement="right"
        width="100%"
        onClose={() => setResultDrawer(false)}
        visible={resultDrawer}
      >
        <SummaryCard
          data={[
            {
              id: 'clean-income',
              label: 'Kwota na rękę',
              value: total.cleanIncome,
              color: '#36A2EB',
              icon: faWallet
            },
            {
              id: 'pit-36',
              label: 'Podatek dochodowy',
              value: total.pit36,
              color: '#FF6384',
              icon: faCut
            },
            {
              id: 'zus',
              label: 'Składka ZUS',
              value: total.ZUS,
              color: '#FFCE56',
              icon: faGopuram
            }
          ]}
        />
      </Drawer>
      <Form onSubmit={submitForm}>
        <FormItem label="Kwota netto" extra="Podaj kwotę netto na fakturze">
          <InputNumber
            value={income}
            min={0}
            max={1000000}
            style={style}
            onChange={handleChangeIncome}
          />
        </FormItem>
        <FormItem
          label="Podatek dochodowy"
          extra="Podaj stawkę podatku dochodowego"
        >
          <Radio.Group
            defaultValue={defaultIncomeTax}
            style={style}
            onChange={e => handleChangeIncomeTax(e)}
            buttonStyle="solid"
          >
            <Radio.Button value={0.17}>17%</Radio.Button>
            <Radio.Button value={0.19}>19%</Radio.Button>
            <Radio.Button value={0.32}>32%</Radio.Button>
          </Radio.Group>
        </FormItem>
        <FormItem label="Składki ZUS" extra="Jaką składkę ZUS opłacasz">
          <Radio.Group
            defaultValue={defaultZUS}
            style={style}
            onChange={e => handleChangeZUS(e)}
            buttonStyle="solid"
          >
            {ZUStypes.map(type => (
              <Radio.Button key={type.id} value={type.value}>
                {type.description}
              </Radio.Button>
            ))}
          </Radio.Group>
        </FormItem>
        <FormItem help="Czy opłacasz stawkę chorobową?">
          <Checkbox
            defaultChecked={sickInsurance}
            onChange={handleChangeSickInsurance}
          >
            Opłacam składkę chorobową
          </Checkbox>
        </FormItem>
        <SubmitButton />
      </Form>
    </>
  );
};

export default ProfitForm;
