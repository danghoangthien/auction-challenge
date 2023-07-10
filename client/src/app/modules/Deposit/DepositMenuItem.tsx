import React, { useState } from 'react';

import { Menu, MenuItemProps } from 'antd';

import modalState from './ModalState';

const DepositMenuItem: React.FC<MenuItemProps> = ({ ...props }) => {
  return (
    <>
      <Menu.Item key="deposit" {...props} onClick={() => modalState.open()}>
        Deposit
      </Menu.Item>
    </>
  );
};

export default DepositMenuItem;
