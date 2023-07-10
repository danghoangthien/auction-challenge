import React, { useEffect, useState } from 'react';

import { Button, Form, Input, Space } from 'antd';

import FormItem from 'app/components/Layout/FormItem';
import ResponseError from 'app/components/ResponseError';
import bidAnAuctionState from 'app/states/BidAnAuctionState';
import responseErrorState from 'app/states/ResponseError';
import PlaceBidHandler from 'services/Bid/PlaceBidHandler';
import PLaceBidFormValues from 'types/PlaceBidFormValues';

import modalState from './ModalState';

const PlaceBidForm: React.FC = () => {
  const onFinish = async (values: PLaceBidFormValues) => {
    try {
      const placeBidHandler = new PlaceBidHandler();
      await placeBidHandler.perform({
        ...values,
        auction_id: bidAnAuctionState.auctionOnBidding.auction_id,
      });
      modalState.close();
    } catch (error: any) {
      console.error('Bidding failed:', error?.response?.data.error);
      responseErrorState.setError(error);
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
      <Form name="placeBidForm" autoComplete="off" onFinish={onFinish}>
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
        <FormItem label="" key="respone_error">
          <Space style={{ display: 'flex', justifyContent: 'center' }}>
            <ResponseError />
          </Space>
        </FormItem>
        <Form.Item>
          <Space style={{ display: 'flex', justifyContent: 'right' }}>
            <Button type="primary" htmlType="submit">
              Bid
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </>
  );
};

export default PlaceBidForm;
