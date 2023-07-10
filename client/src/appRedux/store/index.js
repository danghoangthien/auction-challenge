import { init } from '@rematch/core';
import loadingPlugin from '@rematch/loading';
import { connectRouter, routerMiddleware } from 'connected-react-router';

import { filter, filterContainer, filters } from './../models/filter';
import responseErrorModel from './../models/responseError';
import userModel from './../models/user';

const createBrowserHistory = require('history').createBrowserHistory;

export const history = createBrowserHistory();

const store = init({
  models: {
    userModel,
    responseErrorModel,
    filters,
    filter,
    filterContainer,
  },
  plugins: [loadingPlugin()],
  redux: {
    reducers: {
      router: connectRouter(history),
    },
    middlewares: [routerMiddleware(history)],
  },
});

export default store;
