import React, { useEffect, useState } from 'react';

import { Modal } from 'antd';

import Form from './Form';
import modalState from './ModalState';

const CreateItemModal: React.FC = () => {
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
      <Modal
        title="Create Item"
        visible={visible}
        onCancel={handleCancel}
        footer={null}
        destroyOnClose
      >
        <Form />
      </Modal>
    </>
  );
};

export default CreateItemModal;
