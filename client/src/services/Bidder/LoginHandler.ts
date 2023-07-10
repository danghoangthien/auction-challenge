import Observable from 'abstracts/AObservable';
import axios, { AxiosResponse } from 'axios';
import { API_URL } from 'config';

import AuthListener from 'app/modules/Login/AuthListener';
import SuccessMessageListener from 'app/modules/Login/SuccessMessageListener';

interface LoginResponse {
  token: string;
  email: string;
}

class LoginHandler extends Observable<LoginResponse> {
  async perform(email: string, password: string): Promise<void> {
    try {
      this.registerObserver(new AuthListener());
      this.registerObserver(new SuccessMessageListener());
      // Make a POST request to the login endpoint with the user credentials
      const response: AxiosResponse<{ token: string }> = await axios.post(
        `${API_URL}/auth/login`,
        {
          email,
          password,
        },
        {
          withCredentials: true,
        },
      );
      console.log('response.headers.authorization', response.headers);
      // Retrieve the token from the response headers
      const token = response.headers.authorization?.split(' ')[1];

      this.notifyObservers({ token, email });
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
      // Handle error or display error message
      // ...
    }
  }
}

export default LoginHandler;
