import { AxiosResponse } from 'axios';
import { API_URL } from 'config';

import itemListState from 'app/states/ItemList';
import CreateItemFormValues from 'types/CreateItemFormValues';
import axios from 'utils/request';

import listItemHandler from './ListItem';

class CreateItemHandler {
  async perform(data: CreateItemFormValues): Promise<void> {
    try {
      // Make a POST request to the register endpoint with the user credentials
      const { ready_for_auction, ...item_data } = data;
      const response: AxiosResponse<{ message: string }> = await axios.post(`${API_URL}/items`, {
        item_data,
        ready_for_auction,
      });
      listItemHandler.perform().then(items => itemListState.setItems(items));
      console.log(response.data.message);
    } catch (error) {
      console.error('Create item failed:', error);
      throw error;
    }
    // const getInfo = new GetInfo();
    // getInfo.perform();
  }
}

export default CreateItemHandler;
