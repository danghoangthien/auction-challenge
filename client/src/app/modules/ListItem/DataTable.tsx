import React from 'react';

import { Button, Table, Tag } from 'antd';

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
      title: 'Current Price',
      key: 'current_price',
      render: item => {
        if (item.highest_bid) {
          return <Tag>{item.highest_bid.bid_amount}</Tag>;
        } else {
          return <Tag>{item.initial_price}</Tag>;
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
