import React, { FC, useState } from 'react';
import { isMobile } from 'react-device-detect';

import { faCut, faWallet } from '@fortawesome/free-solid-svg-icons';
import { Form, InputNumber, Radio, Drawer } from 'antd';
import styled from 'styled-components';

import SummaryCard from '../Common/SummaryCard';
import SubmitButton from '../Common/SubmitButton';

interface FormProps {
  width?: string;
}

const FormItem = styled(Form.Item)`
  border: 1px solid #e8e8e8;
  padding: 10px !important;
  margin-bottom: 10px !important;
  border-radius: 3px;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.15);
  width: ${(props: FormProps) => (props.width ? props.width : '100%')};
`;

const SavingsForm: FC = () => {
  const [itemPrice, setItemPrice] = useState(0);
  const [vat, setVat] = useState(1.23);
  const [incomeTax, setIncomeTax] = useState(0.82);
  const [total, setTotal] = useState({
    incomeTaxSavings: 0,
    vatSavings: 0,
    totalSavings: 0,
    total: 0
  });
  const [resultDrawer, setResultDrawer] = useState(false);

  const inputStyle = { width: '100%' };
  const formInputWidth = isMobile ? '100%' : '40%';
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

    const withoutVat = vat > 0 ? itemPrice / vat : 0;
    const incomeTaxSavings = itemPrice - itemPrice * incomeTax;
    const vatSavings = itemPrice - withoutVat;
    const total = vat > 0 ? withoutVat * incomeTax : itemPrice * incomeTax;
    const totalSavings = itemPrice - total;

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
        <FormItem
          label="Kwota brutto"
          extra="Podaj kwotę brutto produktu"
          width={formInputWidth}
        >
          <InputNumber
            value={itemPrice}
            defaultValue={0}
            min={0}
            max={10000}
            style={inputStyle}
            onChange={handleChangePrice}
          />
        </FormItem>

        <FormItem
          label="Stawka VAT"
          extra="Podaj stawkę podatku VAT"
          width={formInputWidth}
        >
          <Radio.Group
            defaultValue={1.23}
            style={inputStyle}
            onChange={e => handleChangeVat(e)}
            buttonStyle="solid"
          >
            <Radio.Button value={0}>0%</Radio.Button>
            <Radio.Button value={1.08}>8%</Radio.Button>
            <Radio.Button value={1.23}>23%</Radio.Button>
          </Radio.Group>
        </FormItem>

        <FormItem
          label="Podatek dochodowy"
          extra="Podaj stawkę podatku dochodowego"
          width={formInputWidth}
        >
          <Radio.Group
            defaultValue={0.83}
            style={inputStyle}
            onChange={e => handleChangeIncome(e)}
            buttonStyle="solid"
          >
            <Radio.Button value={0.83}>17%</Radio.Button>
            <Radio.Button value={0.81}>19%</Radio.Button>
            <Radio.Button value={0.68}>32%</Radio.Button>
          </Radio.Group>
        </FormItem>

        <SubmitButton />
      </Form>
    </>
  );
};

export default SavingsForm;
