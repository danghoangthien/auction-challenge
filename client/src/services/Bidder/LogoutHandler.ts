import Observable from 'abstracts/AObservable';
import axios, { AxiosResponse } from 'axios';
import { API_URL } from 'config';

import AuthListener from 'app/modules/Login/AuthListener';
import SuccessMessageListener from 'app/modules/Login/SuccessMessageListener';

interface LogoutResponse {
  token: string;
}

class LogoutHandler extends Observable<LogoutResponse> {
  async perform(): Promise<void> {
    try {
      this.registerObserver(new AuthListener());
      this.registerObserver(new SuccessMessageListener());
      // Make a POST request to the login endpoint with the user credentials
      const response: AxiosResponse<{ token: string }> = await axios.post(
        `${API_URL}/auth/logout`,
        null,
        {
          withCredentials: true,
        },
      );
      console.log('response.headers.authorization', response.headers);
      // Retrieve the token from the response headers
      const token = response.headers.authorization?.split(' ')[1];

      this.notifyObservers({ token });
    } catch (error) {
      console.error('Logout failed:', error);
      throw error;
      // Handle error or display error message
      // ...
    }
  }
}

export default LogoutHandler;
