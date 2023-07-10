import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { Space, Tag } from 'antd';

import useParseQueryParams from 'hook/useParseQueryParams';
import { ItemStatus } from 'types/ItemStatus';

const Filter = ({ value }) => {
  const { usp, pathname } = useParseQueryParams();
  usp.set('statuses', value);
  return (
    <Tag>
      <a href={`${pathname}?${usp}`}>{value}</a>
    </Tag>
  );
};

const Filters = () => {
  return (
    <Space className="mb-5">
      {Object.values(ItemStatus).map(value => (
        <Filter key={value} value={value} />
      ))}
    </Space>
  );
};

export default Filters;
