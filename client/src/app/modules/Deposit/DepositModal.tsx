import React, { useEffect, useState } from 'react';

import { Modal } from 'antd';

import DepositForm from './DepositForm';
import modalState from './ModalState';

const DepositModal: React.FC = () => {
  const [visible, setVisible] = useState(false);

  const showModal = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  useEffect(() => {
    modalState.register(showModal, handleCancel);
  }, []);

  return (
    <>
      <Modal title="Deposit" visible={visible} onCancel={handleCancel} footer={null} destroyOnClose>
        <DepositForm />
      </Modal>
    </>
  );
};

export default DepositModal;
