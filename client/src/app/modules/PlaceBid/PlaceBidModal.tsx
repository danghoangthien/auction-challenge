import React, { useEffect, useState } from 'react';

import { Modal } from 'antd';

import bidAnAuctionState from 'app/states/BidAnAuctionState';

import modalState from './ModalState';
import PlaceBidForm from './PlaceBidForm';

const Title: React.FC = () => {
  const [item, setItem] = useState<any>();
  useEffect(() => {
    console.log('[Title][useEffect]', bidAnAuctionState.itemOnBidding);
    setItem(bidAnAuctionState.itemOnBidding);
  }, [bidAnAuctionState.itemOnBidding]);
  return <>{`Place a bid for  ${item?.title}`}</>;
};

const PlaceBidModal: React.FC = () => {
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
        title={<Title />}
        visible={visible}
        onCancel={handleCancel}
        footer={null}
        destroyOnClose
      >
        <PlaceBidForm />
      </Modal>
    </>
  );
};

export default PlaceBidModal;
