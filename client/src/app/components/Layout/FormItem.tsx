import React, { useState } from 'react';

import { Form, FormItemProps } from 'antd';

const FormItem: React.FC<FormItemProps> = ({ children, ...props }) => {
  return (
    <Form.Item
      style={{ display: 'flex', marginBottom: 16 }}
      labelCol={{ flex: '0 0 120px' }}
      wrapperCol={{ flex: '1' }}
      {...props}
    >
      {children}
    </Form.Item>
  );
};

export default FormItem;
