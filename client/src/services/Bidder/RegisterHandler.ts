import axios, { AxiosResponse } from 'axios';
import { API_URL } from 'config';

interface RegistrationFormValues {
  name: string;
  email: string;
  password: string;
  password_confirm: string;
}

class RegisterHandler {
  async perform(data: RegistrationFormValues): Promise<void> {
    try {
      // Make a POST request to the register endpoint with the user credentials
      const { name, email, password, password_confirm } = data;
      const response: AxiosResponse<{ message: string }> = await axios.post(`${API_URL}/register`, {
        name,
        email,
        password,
        password_confirm,
      });

      // Handle the registration success response
      console.log(response.data.message);
    } catch (error) {
      console.error('Registration failed:', error);
      throw error;
      // Handle error or display error message
      // ...
    }
  }
}

export default RegisterHandler;
