import { useEffect, useState } from 'react';

import { Space } from 'antd';

import bidderAmount from 'app/states/BidderAmount';
import bidderEmail from 'app/states/BidderEmail';

const UserMail = (): JSX.Element => {
  const [email, setLocalEmail] = useState();
  console.log('[UserMail]email', email);
  useEffect(() => {
    bidderEmail.register(setLocalEmail);
  }, []);
  return <>{email}</>;
};

const UserAmount = (): JSX.Element => {
  const [amount, setLocalAmount] = useState();
  console.log('[UserAmount]amount', amount);
  useEffect(() => {
    bidderAmount.register(setLocalAmount);
  }, []);
  return <>{amount}</>;
};

const UserInfoBar = (): JSX.Element => {
  return (
    <Space>
      <UserMail />
      |
      <UserAmount />
    </Space>
  );
};

export default UserInfoBar;
