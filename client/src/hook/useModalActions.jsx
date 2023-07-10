import { useState } from 'react';

function useModalActions({ onOk = () => {}, onCancel = () => {} }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleOk = () => {
    setIsModalOpen(false);
    onOk();
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    onCancel();
  };

  return [isModalOpen, showModal, closeModal, handleOk, handleCancel];
}

export default useModalActions;
