import React, { FC, useState } from 'react';

import { faCut, faWallet, faGopuram } from '@fortawesome/free-solid-svg-icons';
import { Checkbox, Col, Drawer, Form, InputNumber, Radio, Row } from 'antd';
import styled from 'styled-components';

import { getSocialFee, getSickFee, getHealthFeeTaxFree, getZUSFee } from '../../helpers/zusHelper';
import { saveToLocalStorage, getFromLocalStorage } from '../../helpers/localStorage';
import { INCOME_TAX, PERIOD, WORKING_HOURS, ZUS_TYPE } from '../../constants/defaults';

import SummaryCard from '../Common/SummaryCard';
import SubmitButton from '../Common/SubmitButton';

const FormItem = styled(Form.Item)`
  border: 1px solid #e8e8e8;
  padding: 10px !important;
  margin-bottom: 10px !important;
  border-radius: 3px;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.15);
`;

const PeriodRadioGroup = styled(Radio.Group)`
  && {
    margin-bottom: 10px;
    width: 100%;

    label {
      width: 50%;
      text-align: center;
    }
  }
`;

const ProfitForm: FC = () => {
  const sickInsuranceLSValue = JSON.parse(getFromLocalStorage('sick-insurance')) || false;
  const ZUSTypeLSValue = getFromLocalStorage('zus') || ZUS_TYPE;
  const incomeLSValue = Number(getFromLocalStorage('income')) || 0;
  const incomeTaxLSValue = Number(getFromLocalStorage('income-tax')) || INCOME_TAX;

  const [income, setIncome] = useState(incomeLSValue);
  const [incomeTax, setIncomeTax] = useState(incomeTaxLSValue);
  const [ZUSType, setZUSType] = useState(ZUSTypeLSValue);
  const [total, setTotal] = useState({ pit36: 0, cleanIncome: 0, ZUS: 0 });
  const [period, setPeriod] = useState(PERIOD);
  const [hours, setHours] = useState(WORKING_HOURS);
  const [sickInsurance, setSickInsurance] = useState(sickInsuranceLSValue);
  const [resultDrawer, setResultDrawer] = useState(false);

  const inputStyle = { width: '100%' };
  const ZUStypes = [
    { id: 'zus-type-1', value: 'SMALL', description: 'Ulga na start/Mały ZUS' },
    { id: 'zus-type-2', value: 'PREFERENTIAL', description: 'Preferencyjny ZUS' },
    { id: 'zus-type-3', value: 'NORMAL', description: 'Normalny ZUS' },
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
    saveToLocalStorage('income', value);
  };

  const handleChangeIncomeTax = (e: any) => {
    setIncomeTax(e.target.value);
    saveToLocalStorage('income-tax', e.target.value);
  };

  const handleChangeZUS = (e: any) => {
    setZUSType(e.target.value);
    saveToLocalStorage('zus', e.target.value);
    // TODO: add disabling for radio SickInsurance if zus is lower
  };

  const handleChangeSickInsurance = () => {
    setSickInsurance(!sickInsurance);
    saveToLocalStorage('sick-insurance', JSON.stringify(!sickInsurance));
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

    const type = ZUSType;
    let finalIncome = income;
    let totalZUS = getZUSFee(type);
    let socialFee = getSocialFee(type);
    let healthFeeTaxFree = getHealthFeeTaxFree();

    if (period === 'hour') finalIncome *= hours;
    if (sickInsurance) {
      socialFee += getSickFee(type);
      totalZUS += getSickFee(type);
    }
    
    let pit36 = Math.round((finalIncome - socialFee)) * incomeTax - healthFeeTaxFree;

    setResultDrawer(false);
    setTotal({
      pit36: Math.round(pit36) < 0 ? 0 : Number(pit36.toFixed(2)),
      cleanIncome: Number((finalIncome - pit36 - totalZUS).toFixed(2)),
      ZUS: Number(totalZUS.toFixed(2)),
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
        <PeriodRadioGroup onChange={handleChangePeriod} defaultValue="month">
          <Radio.Button value="month">Miesiąc</Radio.Button>
          <Radio.Button value="hour">Godzina</Radio.Button>
        </PeriodRadioGroup>

        {period === 'month' && (
          <FormItem label="Kwota netto" extra="Podaj kwotę netto na fakturze">
            <InputNumber
              value={income}
              min={0}
              max={1000000}
              style={inputStyle}
              formatter={(value) => moneyFormatter(value)}
              onChange={handleChangeIncome}
            />
          </FormItem>
        )}

        {period === 'hour' && (
          <Row gutter={6}>
            <Col span={12}>
              <FormItem label="Kwota netto" extra="Kwota netto na godzinę">
                <InputNumber
                  value={income}
                  min={0}
                  max={500}
                  style={inputStyle}
                  formatter={(value) => moneyFormatter(value)}
                  onChange={handleChangeIncome}
                />
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem label="Liczba godzin" extra="Ilość godzin roboczych">
                <InputNumber
                  value={hours}
                  min={0}
                  max={300}
                  style={inputStyle}
                  onChange={handleChangeHours}
                />
              </FormItem>
            </Col>
          </Row>
        )}

        <FormItem
          label="Podatek dochodowy"
          extra="Podaj stawkę podatku dochodowego"
        >
          <Radio.Group
            defaultValue={incomeTax}
            style={inputStyle}
            onChange={(e) => handleChangeIncomeTax(e)}
            buttonStyle="solid"
          >
            <Radio.Button value={0.17}>17%</Radio.Button>
            <Radio.Button value={0.19}>19%</Radio.Button>
            <Radio.Button value={0.32}>32%</Radio.Button>
          </Radio.Group>
        </FormItem>

        <FormItem label="Składki ZUS" extra="Jaką składkę ZUS opłacasz">
          <Radio.Group
            defaultValue={ZUSType}
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
        </FormItem>

        <FormItem help="Dobrowolna składka chorobowa.">
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
