import { AxiosResponse } from 'axios';
import { API_URL } from 'config';

import itemListState from 'app/states/ItemList';
import PlaceBidFormValues from 'types/PlaceBidFormValues';
import axios from 'utils/request';

import GetInfo from './../Bidder/GetInfo';
import listItemHandler from './../Item/ListItem';

class PlaceBidHandler {
  async perform(data: PlaceBidFormValues): Promise<void> {
    try {
      // Make a POST request to the register endpoint with the user credentials
      const { amount, auction_id, memo } = data;
      const response: AxiosResponse<{ message: string }> = await axios.post(
        `${API_URL}/bid/place`,
        {
          amount,
          auction_id,
          memo,
        },
      );
      // Handle the registration success response
      console.log(response.data.message);
    } catch (error) {
      console.error('Bidding failed:', error);
      throw error;
    }
    const getInfo = new GetInfo();
    getInfo.perform();
    listItemHandler.perform().then(items => itemListState.setItems(items));
  }
}

export default PlaceBidHandler;
