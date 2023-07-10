import axios from 'axios';

const instance = axios.create({
  headers: {
    'Content-Type': 'application/json',
  },
});

const { REACT_APP_API_URL: API_URL } = process.env;
const loginURL = `${API_URL}/auth/login`;
const registerURL = `${API_URL}/regiter`;
const nonAuthURLs = [loginURL, registerURL];

// request interceptor
instance.interceptors.request.use(
  async request => {
    if (!nonAuthURLs.includes(request.url)) {
      const accessToken = localStorage.getItem('token');
      accessToken && (request.headers['Authorization'] = `Bearer ${accessToken}`);
    }
    return request;
  },
  async error => {
    // Do something with request error
    console.debug('HTTP ERROR', error); // for debug
    return Promise.reject(error);
  },
);

instance.interceptors.response.use(
  async function (response) {
    return response;
  },
  async error => {
    if (error instanceof Error) {
      if (error.response.status === 401) {
        window.location.replace('/login');
      }
      if (error.response.status === 403) {
        window.location.replace('/login');
      }
      return Promise.reject(error);
    }
  },
);

export default instance;
