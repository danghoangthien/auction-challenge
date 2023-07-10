import store from 'appRedux/store';
import formService from 'services/app/form';

const { get: formEndpoint } = formService;
const MODEL = '@app//form__data';
const INITIAL_STATE = {};

const formData = {
  name: MODEL,
  state: INITIAL_STATE,
  reducers: {
    setData(state, payload) {
      return {
        ...state,
        ...payload,
      };
    },
  },
  effects: {
    async get(type, state) {
      if (state[MODEL][type]) {
        return state[MODEL][type];
      }
      const { data } = await formEndpoint(type);
      data.status &&
        this.setData({
          [type]: data,
        });
      return data;
    },
  },
};

store.addModel(formData);
