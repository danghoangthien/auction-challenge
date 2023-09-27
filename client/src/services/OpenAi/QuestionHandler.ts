import axios, { AxiosResponse } from 'axios';
import { API_URL } from 'config';

interface QuestionHandlerFormValues {
  question: string;
}

class QuestionHandler {
  async perform(data: QuestionHandlerFormValues): Promise<string> {
    try {
      // Make a POST request to the register endpoint with the user credentials
      const { question } = data;
      const response: AxiosResponse<{ message: string }> = await axios.post(`${API_URL}/openai`, {
        question
      });

      // Handle the registration success response
      return response.data.message
    } catch (error) {
      console.error('QuestionHandler failed:', error);
      throw error;
      // Handle error or display error message
      // ...
    }
  }
}

export default QuestionHandler;
