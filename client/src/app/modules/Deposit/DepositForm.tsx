import React, { useEffect, useState } from 'react';

import { Button, Form, Input, Space } from 'antd';

import FormItem from 'app/components/Layout/FormItem';
import DepositHandler from 'services/Bidder/DepositHandler';

import modalState from './ModalState';

interface DepositFormValues {
  amount: number;
  memo: string;
}

const DepositForm: React.FC = () => {
  const onFinish = async (values: DepositFormValues) => {
    try {
      const depositHandler = new DepositHandler();
      await depositHandler.perform(values);
      modalState.close();
    } catch (error) {
      console.error('Deposit failed:', error);
      // Handle error or display error message
      // ...
    }
  };

  const validateAmount = (_: any, value: string) => {
    const number = parseFloat(value);
    if (isNaN(number) || number <= 0) {
      return Promise.reject('Please enter a non-negative number greater than zero.');
    }
    return Promise.resolve();
  };

  return (
    <>
      <Form name="depositForm" autoComplete="off" onFinish={onFinish}>
        <FormItem
          name="amount"
          label="Amount"
          rules={[
            { required: true, message: 'Please enter a valid amount.' },
            { validator: validateAmount },
          ]}
        >
          <Input />
        </FormItem>
        <FormItem
          name="memo"
          label="Memo"
          rules={[{ required: true, message: 'Please enter memo' }]}
        >
          <Input.TextArea />
        </FormItem>
        <FormItem label="Currency">{'USD'}</FormItem>
        <Form.Item>
          <Space style={{ display: 'flex', justifyContent: 'right' }}>
            <Button type="primary" htmlType="submit">
              Deposit
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </>
  );
};

export default DepositForm;
