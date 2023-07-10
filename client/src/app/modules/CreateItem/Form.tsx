import React, { useEffect, useState } from 'react';

import { Button, Checkbox, Form, Input, Space } from 'antd';

import FormItem from 'app/components/Layout/FormItem';
import CreateItem from 'services/Item/CreateItem';
import CreateItemFormValues from 'types/CreateItemFormValues';

import modalState from './ModalState';

const CreateItemForm: React.FC = () => {
  const onFinish = async (values: CreateItemFormValues) => {
    try {
      const createItemHandler = new CreateItem();
      await createItemHandler.perform(values);
      modalState.close();
    } catch (error) {
      console.error('Create Item failed:', error);
      // Handle error or display error message
      // ...
    }
  };

  return (
    <>
      <Form name="createItemForm" autoComplete="off" onFinish={onFinish}>
        <FormItem
          name="title"
          label="Title"
          rules={[{ required: true, message: 'Please enter title' }]}
        >
          <Input />
        </FormItem>
        <FormItem
          name="description"
          label="Description"
          rules={[{ required: true, message: 'Please enter description' }]}
        >
          <Input.TextArea />
        </FormItem>
        <FormItem
          name="initial_price"
          label="Initial price"
          rules={[
            { required: true, message: 'Please enter a valid initial price.' },
            { min: 1, message: 'Initial price must be a positive number' },
          ]}
        >
          <Input type="number" />
        </FormItem>
        <FormItem
          name="time_window"
          label="Time Window"
          rules={[
            { required: true, message: 'Please enter a valid time window.' },
            {
              validator: (_, value) =>
                Number.isInteger(parseInt(value))
                  ? Promise.resolve()
                  : Promise.reject('Time window must be an integer'),
            },
            { min: 1, message: 'Time window must be a positive number' },
          ]}
        >
          <Input type="number" />
        </FormItem>
        <FormItem name="ready_for_auction" valuePropName="checked" wrapperCol={{ offset: 6 }}>
          <Checkbox>Ready for Auction</Checkbox>
        </FormItem>
        <Form.Item>
          <Space style={{ display: 'flex', justifyContent: 'right' }}>
            <Button type="primary" htmlType="submit">
              Create
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </>
  );
};

export default CreateItemForm;
