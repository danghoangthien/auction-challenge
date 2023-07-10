import { AxiosResponse } from 'axios';
import { API_URL } from 'config';

import bidderAmountState from 'app/states/BidderAmount';
import bidderEmailState from 'app/states/BidderEmail';
import axios from 'utils/request';

interface Bidder {
  bidder: BidderObject;
}

interface BidderObject {
  id: number;
  name: string;
  email: string;
  deposit: string;
}

class GetInfo {
  async perform(): Promise<BidderObject> {
    try {
      const response: AxiosResponse<Bidder> = await axios.get(`${API_URL}/bidders`);

      // Extract the bidder information from the response data
      const bidderResponse: Bidder = response.data;
      bidderAmountState.doSetAmount(parseInt(bidderResponse.bidder.deposit));
      bidderEmailState.setEmail(bidderResponse.bidder.email);
      return bidderResponse.bidder;
    } catch (error) {
      console.error('Failed to get bidder information:', error);
      throw error;
    }
  }
}

export default GetInfo;
