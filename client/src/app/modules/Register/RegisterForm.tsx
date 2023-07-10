import React, { useEffect, useState } from 'react';

import { Button, Form, Input, Modal } from 'antd';

import FormContainer from 'app/components/Layout/FormContainer';
import FormItem from 'app/components/Layout/FormItem';
import RegisterHandler from 'services/Bidder/RegisterHandler';

interface RegistrationFormValues {
  name: string;
  email: string;
  password: string;
  password_confirm: string;
}

const RegistrationForm: React.FC = () => {
  const onFinish = async (values: RegistrationFormValues) => {
    try {
      const registerHandler = new RegisterHandler();
      await registerHandler.perform(values);
      // notify
      window.location.href = '/login';
    } catch (error) {
      console.error('Login failed:', error);
      // Handle error or display error message
      // ...
    }
  };

  return (
    <FormContainer>
      <Form name="registrationForm" onFinish={onFinish}>
        <FormItem
          name="name"
          label="Name"
          rules={[{ required: true, message: 'Please enter your name' }]}
        >
          <Input />
        </FormItem>
        <FormItem
          name="email"
          label="Email"
          rules={[
            { required: true, message: 'Please enter your email' },
            { type: 'email', message: 'Please enter a valid email' },
          ]}
        >
          <Input />
        </FormItem>
        <FormItem
          name="password"
          label="Password"
          rules={[{ required: true, message: 'Please enter your password' }]}
        >
          <Input.Password />
        </FormItem>
        <FormItem
          name="password_confirm"
          label="Password confirm"
          rules={[{ required: true, message: 'Please enter your password confirm' }]}
        >
          <Input.Password />
        </FormItem>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Register
          </Button>
        </Form.Item>
      </Form>
    </FormContainer>
  );
};

export default RegistrationForm;
