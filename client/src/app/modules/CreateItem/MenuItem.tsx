import React from 'react';

import { Menu, MenuItemProps } from 'antd';

import modalState from './ModalState';

const MenuItem: React.FC<MenuItemProps> = ({ ...props }) => {
  return (
    <>
      <Menu.Item
        key="create_item"
        {...props}
        onClick={() => {
          console.log('create_item', 'cliked');
          modalState.open();
        }}
      >
        Create new item
      </Menu.Item>
    </>
  );
};

export default MenuItem;
