import * as React from 'react';

import { faCut, faWallet } from '@fortawesome/free-solid-svg-icons';
import { Form, InputNumber, Radio, Drawer, Row, Col } from 'antd';

import { DEFAULT_VAT, DEFAULT_INCOME_TAX } from '../../constants/defaults';

import Button from '../Common/Button/Button';
import SummaryCard from '../Common/SummaryCard/SummaryCard';

import * as S from './styles';

const SavingsForm = (): JSX.Element => {
  const [itemPrice, setItemPrice] = React.useState(0);
  const [vat, setVat] = React.useState(DEFAULT_VAT);
  const [incomeTax, setIncomeTax] = React.useState(DEFAULT_INCOME_TAX);
  const [total, setTotal] = React.useState({
    incomeTaxSavings: 0,
    vatSavings: 0,
    totalSavings: 0,
    total: 0,
  });
  const [resultDrawer, setResultDrawer] = React.useState(false);

  const inputStyle = { width: '100%' };
  const summaryCardData = [
    {
      id: 'income-tax-savings',
      label: 'Zaoszczędzone z Podatku dochodowego',
      value: total.incomeTaxSavings,
      color: '#36A2EB',
      icon: faCut,
    },
    {
      id: 'vat-savings',
      label: 'Zaoszczędzone z VAT',
      value: total.vatSavings,
      color: '#FFCE56',
      icon: faCut,
    },
    {
      id: 'total-savings',
      label: 'Łącznie zaoszczędzone',
      value: total.totalSavings,
      color: '#6ce865',
      icon: faWallet,
    },
    {
      id: 'total',
      label: 'Łącznie do zapłacenia',
      value: total.total,
      color: '#FF6384',
      icon: faCut,
    },
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

  const moneyFormatter = (value: any) => {
    return `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
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
      total: Math.round(total),
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
        <S.FormItem label="Kwota brutto" help="Podaj kwotę brutto produktu">
          <InputNumber
            value={itemPrice}
            defaultValue={0}
            min={0}
            max={10000}
            style={inputStyle}
            formatter={(value) => moneyFormatter(value)}
            onChange={handleChangePrice}
          />
        </S.FormItem>

        <S.FormItem label="Stawka VAT" help="Podaj stawkę podatku VAT">
          <Radio.Group
            defaultValue={DEFAULT_VAT}
            style={inputStyle}
            onChange={(e) => handleChangeVat(e)}
            buttonStyle="solid"
          >
            <Radio.Button value={0}>0%</Radio.Button>
            <Radio.Button value={0.08}>8%</Radio.Button>
            <Radio.Button value={0.23}>23%</Radio.Button>
          </Radio.Group>
        </S.FormItem>

        <S.FormItem
          label="Podatek dochodowy"
          help="Podaj stawkę podatku dochodowego"
        >
          <Radio.Group
            defaultValue={DEFAULT_INCOME_TAX}
            style={inputStyle}
            onChange={(e) => handleChangeIncome(e)}
            buttonStyle="solid"
          >
            <Radio.Button value={0.17}>17%</Radio.Button>
            <Radio.Button value={0.19}>19%</Radio.Button>
            <Radio.Button value={0.32}>32%</Radio.Button>
          </Radio.Group>
        </S.FormItem>

        <Row align="middle" justify="center">
          <Col xs={24} sm={20} md={16} lg={12} xl={8} xxl={8}>
            <Button block htmlType="submit" type="primary">
              Oblicz
            </Button>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default SavingsForm;
