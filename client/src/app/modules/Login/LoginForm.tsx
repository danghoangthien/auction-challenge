import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { Button, Form, Input, message, Space } from 'antd';

import FormContainer from 'app/components/Layout/FormContainer';
import FormItem from 'app/components/Layout/FormItem';
import LoginHandler from 'services/Bidder/LoginHandler';

interface LoginFormValues {
  email: string;
  password: string;
}

const LoginForm: React.FC = () => {
  const onFinish = async (values: LoginFormValues) => {
    const { email, password } = values;

    try {
      const loginHandler = new LoginHandler();
      await loginHandler.perform(email, password);
      window.location.href = '/home';
    } catch (error: any) {
      console.error('Login failed:', error);
      message.error(error.response.data);
    }
  };

  return (
    <FormContainer>
      <Form name="loginForm" onFinish={onFinish}>
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
        <Form.Item style={{ marginBottom: 16 }}>
          <Space style={{ display: 'flex', justifyContent: 'right' }}>
            <Button type="primary" htmlType="submit">
              Login
            </Button>
            <span>Or</span>
            <Button>
              {/* Add the link to the registration form */}
              <Link to="/register">Register now</Link>
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </FormContainer>
  );
};

export default LoginForm;
