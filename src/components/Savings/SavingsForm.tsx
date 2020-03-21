import React, { FC, useState } from 'react';

import { faCut, faWallet } from '@fortawesome/free-solid-svg-icons';
import { Form, InputNumber, Radio, Drawer } from 'antd';
import styled from 'styled-components';

import { DEFAULT_VAT, DEFAULT_INCOME_TAX } from '../../constants/defaults';
import SummaryCard from '../Common/SummaryCard';
import SubmitButton from '../Common/SubmitButton';

const FormItem = styled(Form.Item)`
  border: 1px solid #e8e8e8;
  padding: 10px !important;
  margin-bottom: 10px !important;
  border-radius: 3px;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.15);
`;

const SavingsForm: FC = () => {
  const [itemPrice, setItemPrice] = useState(100);
  const [vat, setVat] = useState(DEFAULT_VAT);
  const [incomeTax, setIncomeTax] = useState(DEFAULT_INCOME_TAX);
  const [total, setTotal] = useState({
    incomeTaxSavings: 0,
    vatSavings: 0,
    totalSavings: 0,
    total: 0
  });
  const [resultDrawer, setResultDrawer] = useState(false);

  const inputStyle = { width: '100%' };
  const summaryCardData = [
    {
      id: 'income-tax-savings',
      label: 'Zaoszczędzone z Podatku dochodowego',
      value: total.incomeTaxSavings,
      color: '#36A2EB',
      icon: faCut
    },
    {
      id: 'vat-savings',
      label: 'Zaoszczędzone z VAT',
      value: total.vatSavings,
      color: '#FFCE56',
      icon: faCut
    },
    {
      id: 'total-savings',
      label: 'Łącznie zaoszczędzone',
      value: total.totalSavings,
      color: '#6ce865',
      icon: faWallet
    },
    {
      id: 'total',
      label: 'Łącznie do zapłacenia',
      value: total.total,
      color: '#FF6384',
      icon: faCut
    }
  ];

  const handleChangePrice = (value: any) => {
    setItemPrice(value);
  };

  const handleChangeVat = (e: any) => {
    setVat(e.target.value);
  };

  const handleChangeIncome = (e: any) => {
    setIncomeTax(e.target.value);
  };

  const submitForm = (e: any) => {
    setTotal({ incomeTaxSavings: 0, vatSavings: 0, totalSavings: 0, total: 0 });

    const vatSavings = itemPrice * vat;
    const incomeTaxSavings = itemPrice * incomeTax;
    const totalSavings = vatSavings + incomeTaxSavings;
    const total = itemPrice - totalSavings;

    setResultDrawer(false);
    setTotal({
      incomeTaxSavings: Math.round(incomeTaxSavings),
      vatSavings: Math.round(vatSavings),
      totalSavings: Math.round(totalSavings),
      total: Math.round(total)
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

      <Form onFinish={submitForm}>
        <FormItem label="Kwota brutto" extra="Podaj kwotę brutto produktu">
          <InputNumber
            value={itemPrice}
            defaultValue={0}
            min={0}
            max={10000}
            style={inputStyle}
            onChange={handleChangePrice}
          />
        </FormItem>

        <FormItem label="Stawka VAT" extra="Podaj stawkę podatku VAT">
          <Radio.Group
            defaultValue={DEFAULT_VAT}
            style={inputStyle}
            onChange={e => handleChangeVat(e)}
            buttonStyle="solid"
          >
            <Radio.Button value={0}>0%</Radio.Button>
            <Radio.Button value={0.08}>8%</Radio.Button>
            <Radio.Button value={0.23}>23%</Radio.Button>
          </Radio.Group>
        </FormItem>

        <FormItem
          label="Podatek dochodowy"
          extra="Podaj stawkę podatku dochodowego"
        >
          <Radio.Group
            defaultValue={DEFAULT_INCOME_TAX}
            style={inputStyle}
            onChange={e => handleChangeIncome(e)}
            buttonStyle="solid"
          >
            <Radio.Button value={0.17}>17%</Radio.Button>
            <Radio.Button value={0.19}>19%</Radio.Button>
            <Radio.Button value={0.32}>32%</Radio.Button>
          </Radio.Group>
        </FormItem>

        <SubmitButton />
      </Form>
    </>
  );
};

export default SavingsForm;
