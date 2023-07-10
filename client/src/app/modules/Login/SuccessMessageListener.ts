import message from 'antd/es/message';
import IObserver from 'interfaces/IObserver';

interface LoginResponse {
  token: string;
  email: string;
}

export default class SuccessMessageListener implements IObserver<LoginResponse> {
  async update(responeData: LoginResponse) {
    message.success(`${responeData.email} has been login successfully`);
  }
}
