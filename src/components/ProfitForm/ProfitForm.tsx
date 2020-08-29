import React, { useState } from 'react';

import { CalendarOutlined, FieldTimeOutlined } from '@ant-design/icons';
import { faCut, faWallet, faGopuram } from '@fortawesome/free-solid-svg-icons';
import { Checkbox, Col, Drawer, Form, InputNumber, Radio, Row } from 'antd';

import {
  DEFAULT_INCOME_TAX,
  INSURANCE,
  ZUS_RATES,
} from '../../constants/defaults';
import SummaryCard from '../Common/SummaryCard/SummaryCard';
import SubmitButton from '../Common/SubmitButton/SubmitButton';

import * as S from './styles';

const ProfitForm = (): JSX.Element => {
  const [income, setIncome] = useState(0);
  const [incomeTax, setIncomeTax] = useState(DEFAULT_INCOME_TAX);
  const [ZUS, setZUS] = useState(ZUS_RATES.LEVEL1);
  const [total, setTotal] = useState({ pit36: 0, cleanIncome: 0, ZUS: 0 });
  const [period, setPeriod] = useState('month');
  const [hours, setHours] = useState(168);
  const [sickInsurance, setSickInsurance] = useState(true);
  const [resultDrawer, setResultDrawer] = useState(false);

  const inputStyle = { width: '100%' };
  const ZUStypes = [
    { id: 'zus-type-1', value: ZUS_RATES.LEVEL0, description: 'Ulga na start' },
    { id: 'zus-type-2', value: ZUS_RATES.LEVEL1, description: 'Mały ZUS' },
    { id: 'zus-type-3', value: ZUS_RATES.LEVEL2, description: 'Normalny ZUS' },
  ];
  const summaryCardData = [
    {
      id: 'clean-income',
      label: 'Kwota na rękę',
      value: total.cleanIncome,
      color: '#36A2EB',
      icon: faWallet,
    },
    {
      id: 'pit-36',
      label: 'Podatek dochodowy',
      value: total.pit36,
      color: '#FF6384',
      icon: faCut,
    },
    {
      id: 'zus',
      label: 'Składka ZUS',
      value: total.ZUS,
      color: '#FFCE56',
      icon: faGopuram,
    },
  ];

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

  const handleChangePeriod = (e: any) => {
    setIncome(0);
    setPeriod(e.target.value);
  };

  const handleChangeHours = (value: any) => {
    setHours(value);
  };

  const moneyFormatter = (value: any) => {
    return `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  const submitForm = (e: any) => {
    setTotal({ pit36: 0, cleanIncome: 0, ZUS: 0 });

    const totalHealth = (INSURANCE.HEALTH * 0.0775) / 0.09;
    let finalIncome = income;
    let basicInsurance =
      INSURANCE.OLDAGE + INSURANCE.PENSION + INSURANCE.ACCIDENT;
    let totalZUS = ZUS;

    if (sickInsurance) {
      totalZUS += INSURANCE.SICK;
      basicInsurance += INSURANCE.SICK;
    }

    if (period === 'hour') {
      finalIncome *= hours;
    }

    let pit36 =
      Math.round((finalIncome - basicInsurance) * incomeTax) - totalHealth;

    setResultDrawer(false);
    setTotal({
      pit36: Math.round(pit36) < 0 ? 0 : Math.round(pit36),
      cleanIncome: Math.round(finalIncome - pit36 - totalZUS),
      ZUS: Math.round(totalZUS),
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
        <SummaryCard data={summaryCardData} />
      </Drawer>

      <Form layout="vertical" onFinish={submitForm}>
        <S.PeriodRadioGroup onChange={handleChangePeriod} defaultValue="month">
          <Radio.Button value="month">Miesiąc</Radio.Button>
          <Radio.Button value="hour">Godzina</Radio.Button>
        </S.PeriodRadioGroup>

        {period === 'month' && (
          <S.FormItem label="Kwota netto" extra="Podaj kwotę netto na fakturze">
            <InputNumber
              value={income}
              min={0}
              max={1000000}
              style={inputStyle}
              formatter={(value) => moneyFormatter(value)}
              onChange={handleChangeIncome}
            />
          </S.FormItem>
        )}

        {period === 'hour' && (
          <Row gutter={6}>
            <Col span={12}>
              <S.FormItem label="Kwota netto" extra="Kwota netto na godzinę">
                <InputNumber
                  value={income}
                  min={0}
                  max={500}
                  style={inputStyle}
                  formatter={(value) => moneyFormatter(value)}
                  onChange={handleChangeIncome}
                />
              </S.FormItem>
            </Col>
            <Col span={12}>
              <S.FormItem label="Liczba godzin" extra="Ilość godzin roboczych">
                <InputNumber
                  value={hours}
                  min={0}
                  max={300}
                  style={inputStyle}
                  onChange={handleChangeHours}
                />
              </S.FormItem>
            </Col>
          </Row>
        )}

        <S.FormItem
          label="Podatek dochodowy"
          extra="Podaj stawkę podatku dochodowego"
        >
          <Radio.Group
            defaultValue={DEFAULT_INCOME_TAX}
            style={inputStyle}
            onChange={(e) => handleChangeIncomeTax(e)}
            buttonStyle="solid"
          >
            <Radio.Button value={0.17}>17%</Radio.Button>
            <Radio.Button value={0.19}>19%</Radio.Button>
            <Radio.Button value={0.32}>32%</Radio.Button>
          </Radio.Group>
        </S.FormItem>

        <S.FormItem label="Składki ZUS" extra="Jaką składkę ZUS opłacasz">
          <Radio.Group
            defaultValue={ZUS_RATES.LEVEL1}
            style={inputStyle}
            onChange={(e) => handleChangeZUS(e)}
            buttonStyle="solid"
          >
            {ZUStypes.map((type) => (
              <Radio.Button key={type.id} value={type.value}>
                {type.description}
              </Radio.Button>
            ))}
          </Radio.Group>
        </S.FormItem>

        <S.FormItem help="Czy opłacasz stawkę chorobową?">
          <Checkbox
            defaultChecked={sickInsurance}
            onChange={handleChangeSickInsurance}
          >
            Opłacam składkę chorobową
          </Checkbox>
        </S.FormItem>

        <SubmitButton />
      </Form>
    </>
  );
};

export default ProfitForm;
