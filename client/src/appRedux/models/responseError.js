import store from 'appRedux/store';

const INITIAL_STATE = {};

const model = {
  name: '@app//responseError',
  state: INITIAL_STATE, // initial state
  reducers: {
    setData(state, payload) {
      return {
        ...state,
        ...payload,
      };
    },
    getData(state) {
      console.log('calling getData');
      console.log('state', state);
      return state;
    },
  },
};

export default model;
