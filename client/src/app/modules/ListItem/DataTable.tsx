import React from 'react';

import { Button, Descriptions, Table, Tag } from 'antd';
import DescriptionsItem from 'antd/lib/descriptions/Item';
import styled from 'styled-components';

import PlaceBidButton from '../PlaceBid/PlaceBidButton';

export interface Item {
  item_id: number;
  title: string;
  initial_price: number;
  time_window: number;
  status: string;
}

interface ItemListProps {
  items: Item[];
}

const StyledDescriptions = styled(Descriptions)`
  .ant-descriptions-view {
    width: 550px;
  }
  .ant-descriptions-item-label {
    width: 150px;
  }
`;

const AuctionData = ({ email = 'None', price }) => {
  return (
    <StyledDescriptions column={1} bordered>
      <DescriptionsItem
        key="1"
        label={<span style={{ width: '150px', display: 'inline-block' }}>Current Winner</span>}
      >
        {email}
      </DescriptionsItem>
      <DescriptionsItem
        key="2"
        label={<span style={{ width: '150px', display: 'inline-block' }}>Current Price</span>}
      >
        {price} USD
      </DescriptionsItem>
    </StyledDescriptions>
  );
};

const DataTable: React.FC<ItemListProps> = ({ items }) => {
  console.log('items', items);
  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Auction Data',
      key: 'current_price',
      render: item => {
        if (item.highest_bid) {
          return (
            <AuctionData email={item.current_winner?.email} price={item.highest_bid.bid_amount} />
          );
        } else {
          return <AuctionData price={item.initial_price} />;
        }
      },
    },
    {
      title: 'Time Window',
      dataIndex: 'time_window',
      key: 'time_window',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: status => <Tag>{status}</Tag>,
    },
    {
      title: 'Action',
      render: item => {
        console.log('item.highest_bid', item.highest_bid);
        if (item.current_auction) {
          return <PlaceBidButton auction={item.current_auction} item={item} />;
        } else {
          return <Button disabled>Bid</Button>;
        }
      },
    },
    // Add more columns as needed
  ];

  return <Table dataSource={items} columns={columns} />;
};

export default DataTable;
