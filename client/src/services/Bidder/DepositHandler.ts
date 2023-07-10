import { AxiosResponse } from 'axios';
import { API_URL } from 'config';

import axios from 'utils/request';

import GetInfo from './GetInfo';

interface DepositFormValues {
  amount: number;
  memo: string;
}

class DepositHandler {
  async perform(data: DepositFormValues): Promise<void> {
    try {
      // Make a POST request to the register endpoint with the user credentials
      const { amount, memo } = data;
      const response: AxiosResponse<{ message: string }> = await axios.post(
        `${API_URL}/bidders/deposit`,
        {
          amount,
          memo,
        },
      );
      // Handle the registration success response
      console.log(response.data.message);
    } catch (error) {
      console.error('Deposit failed:', error);
      throw error;
    }
    const getInfo = new GetInfo();
    getInfo.perform();
  }
}

export default DepositHandler;
