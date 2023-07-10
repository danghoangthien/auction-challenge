import React, { useState } from 'react';

import { Button, ButtonProps } from 'antd';

import bidAnAuctionState from 'app/states/BidAnAuctionState';
import responseErrorState from 'app/states/ResponseError';

import modalState from './ModalState';

const PlaceBidButton: React.FC<any> = ({ item, auction }) => {
  const [currentAuction] = useState(auction);
  const [currentItem] = useState(item);
  const onClickHandler = () => {
    bidAnAuctionState.auctionOnBidding = currentAuction;
    bidAnAuctionState.itemOnBidding = currentItem;
    responseErrorState.setError(null);
    modalState.open();
  };
  return (
    <>
      <Button type="primary" key="place_bid" onClick={onClickHandler}>
        Place Bid
      </Button>
    </>
  );
};

export default PlaceBidButton;
