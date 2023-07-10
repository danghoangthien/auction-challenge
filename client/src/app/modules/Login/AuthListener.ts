import IObserver from 'interfaces/IObserver';

import authService from 'services/AuthService';

interface LoginResponse {
  token: string;
  email: string;
}

export default class AuthListener implements IObserver<LoginResponse> {
  async update({ email, token }: LoginResponse) {
    console.log(`token of ${email} has been stored in by authService`);
    authService.login(token);
  }
}
