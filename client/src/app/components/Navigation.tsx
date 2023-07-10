import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import {
  FormOutlined,
  HomeOutlined,
  LogoutOutlined,
  UserOutlined,
  WalletOutlined,
} from '@ant-design/icons';
import { Dropdown, Menu, Space } from 'antd';
import styled from 'styled-components';

import CreateItemModal from 'app/modules/CreateItem/CreateItemModal';
import CreateItemMenuItem from 'app/modules/CreateItem/MenuItem';
import DepositMenuItem from 'app/modules/Deposit/DepositMenuItem';
import DepositModal from 'app/modules/Deposit/DepositModal';
import PlaceBidModal from 'app/modules/PlaceBid/PlaceBidModal';
import GetInfo from 'services/Bidder/GetInfo';
import serverErrorHandler from 'utils/handleServerError';

import UserInfoBar from './UserInfoBar';

const HorizontalNavHeader = (): JSX.Element => {
  const history = useHistory();

  useEffect(() => {
    const getInfo = new GetInfo();
    getInfo.perform().catch((error: any) => serverErrorHandler(error));
  }, []);

  const handleMenuClick = (path: string) => {
    history.push(path);
  };

  const handleLogout = () => {
    // Handle logout logic here
    // Redirect to the login page or perform any other necessary actions
  };

  const profileMenu = (
    <Menu>
      <CreateItemMenuItem key="create_item" icon={<FormOutlined />} />
      <DepositMenuItem key="deposit" icon={<WalletOutlined />} />
      <Menu.Item key="logout" icon={<LogoutOutlined />} onClick={handleLogout}>
        Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <>
      <StyledMenu theme="dark" mode="horizontal" selectable={false}>
        <AlignedMenuItem key="home" onClick={() => handleMenuClick('/')}>
          <IconWrapper>
            <HomeOutlined />
          </IconWrapper>
          <MenuText>Home</MenuText>
        </AlignedMenuItem>
        <Dropdown overlay={profileMenu} trigger={['click']} placement="bottomRight">
          <UserMenuItem key="profile">
            <Space>
              <UserInfoBar />
              <UserOutlined />
            </Space>
          </UserMenuItem>
        </Dropdown>
      </StyledMenu>
      <DepositModal />
      <CreateItemModal />
      <PlaceBidModal />
    </>
  );
};

const StyledMenu = styled(Menu)`
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px;
  position: fixed;
  top: 0;
  z-index: 1;
  width: 100vw;
`;

const UserMenuItem = styled(Menu.Item)`
  margin-left: auto;
  margin-right: 0.25vw;
`;

const AlignedMenuItem = styled(Menu.Item)`
  display: flex;
  align-items: center;
`;

const IconWrapper = styled.span`
  margin-right: 6px;
  vertical-align: middle;
`;

const MenuText = styled.span`
  vertical-align: sub;
`;

export default HorizontalNavHeader;
