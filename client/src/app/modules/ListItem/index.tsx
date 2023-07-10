import React, { useEffect, useState } from 'react';

import itemListState from 'app/states/ItemList';
import useParseQueryParams from 'hook/useParseQueryParams';
import listItemHandler from 'services/Item/ListItem';
import { ItemStatus } from 'types/ItemStatus';

import DataTable, { Item } from './DataTable';
import Filters from './Filters';

// const useRegisterState = () => {
//   const [, setItems] = useState<any[]>([]);
//   useEffect(() => {
//     itemListState.register(setItems);
//   }, []);
//   return [itemListState.items, itemListState.setItems];
// }

const Container = () => {
  const { queryObject } = useParseQueryParams();
  const [items, setItems] = useState([]);
  useEffect(() => {
    itemListState.register(setItems);
  }, []);

  useEffect(() => {
    console.log('[ListItem][useEffect]queryObject', queryObject);
    const statusArray = queryObject.statuses ? queryObject.statuses.split(',') : [];
    const statusFilters = statusArray.map((status: string) => status as ItemStatus);
    listItemHandler
      .setStatusFilter(statusFilters)
      .perform()
      .then(items => itemListState.setItems(items));
  }, [queryObject]);

  return (
    <>
      <Filters />
      <DataTable items={items as Item[]} />
    </>
  );
};

export default Container;
