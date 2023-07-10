// import store from 'appRedux/store';
import Cookies from 'cookies-js';

const INITIAL_STATE = {};

const user = {
  name: '@app//detail__user',
  state: INITIAL_STATE,
  reducers: {
    setData(state, payload) {
      const newState = {
        ...state,
        ...payload,
      };
      newState?.access_token && Cookies.set('access_token', newState?.access_token);
      return newState;
    },
    getData(state) {
      return state;
    },
  },
};

export default user;
//store.addModel(user);
