import { AxiosResponse } from 'axios';
import { API_URL } from 'config';

import CreateItemFormValues from 'types/CreateItemFormValues';
import { ItemStatus } from 'types/ItemStatus';
import axios from 'utils/request';

interface QueryPrams {
  statuses?: string;
}

class ListItemHandler {
  private statusFilter: ItemStatus[];
  constructor() {
    this.statusFilter = [];
  }
  setStatusFilter(statusFilter: ItemStatus[]) {
    this.statusFilter = statusFilter;
    return this;
  }
  async perform(): Promise<any> {
    try {
      const queryParams: QueryPrams = {};
      if (this.statusFilter.length > 0) {
        queryParams.statuses = this.statusFilter.join(',');
      }
      const response: AxiosResponse<{ message: string; items: any }> = await axios.get(
        `${API_URL}/items`,
        {
          params: queryParams,
        },
      );
      //console.log('[ListItemHandler]',response.data.items);
      return response.data.items;
    } catch (error) {
      console.error('List item failed:', error);
      throw error;
    }
  }
}

export default new ListItemHandler();
