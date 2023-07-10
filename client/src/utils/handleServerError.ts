import { notification } from 'antd';
import { AxiosError } from 'axios';

const serverErrorHandler = (error: AxiosError): void => {
  if (error.response) {
    const { status, data } = error.response;

    switch (status) {
      case 400:
        // Handle Bad Request error
        notification.error({ message: 'Bad Request', description: (data as any)?.message });
        break;
      case 401:
        // Handle Unauthorized error
        notification.error({ message: 'Unauthorized', description: 'Please log in again' });
        break;
      case 403:
        // Handle Forbidden error
        notification.error({
          message: 'Forbidden',
          description: 'You are not allowed to access this resource',
        });
        break;
      case 404:
        // Handle Not Found error
        notification.error({
          message: 'Not Found',
          description: 'The requested resource was not found',
        });
        break;
      case 422:
        // Handle Unprocessable Entity error
        notification.error({
          message: 'Unprocessable Entity',
          description: (data as any)?.message,
        });
        break;
      case 500:
        // Handle Internal Server Error
        notification.error({
          message: 'Internal Server Error',
          description: 'Something went wrong on the server',
        });
        break;
      default:
        // Handle other status codes
        notification.error({ message: 'Error', description: 'An error occurred' });
    }
  } else {
    // Handle other errors (e.g., network errors)
    notification.error({ message: 'Error', description: 'An error occurred' });
  }
};

export default serverErrorHandler;
