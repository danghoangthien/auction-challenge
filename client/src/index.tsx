/**
 * index.tsx
 *
 * This is the entry file for the application, only setup and boilerplate
 * code.
 */

import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';

import * as React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import { ConnectedRouter } from 'connected-react-router';
import FontFaceObserver from 'fontfaceobserver';

// Use consistent styling
import 'sanitize.css/sanitize.css';

import { HelmetProvider } from 'react-helmet-async';

import ConfigProvider from 'antd/es/config-provider';
import notification from 'antd/es/notification';
import { App } from 'app';
import moment from 'moment';
import reportWebVitals from 'reportWebVitals';

import { PRIMARY_COLOR } from 'styles/StyleConstants';

import store, { history } from './appRedux/store';

import 'moment/locale/en-ie';

import enUS from 'antd/es/locale/en_US';

// Initialize languages
//import './locales/i18n';
import 'antd/dist/antd.variable.min.css';
// import 'antd/dist/antd.less';
import 'antd-css-utilities/utility.min.css';
import 'material-symbols/outlined.css';

import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

// Observe loading of Inter (to remove 'Inter', remove the <link> tag in
// the index.html file and this observer)
const robotoMonoObserver = new FontFaceObserver('Roboto Mono', {});
const NotoSansObserver = new FontFaceObserver('Noto Sans JP', {});

moment.locale('en');

// When Inter is loaded, add a font-family using Inter to the body
robotoMonoObserver.load().then(() => {
  document.documentElement.className += 'roboto-mono';
});
NotoSansObserver.load().then(() => {
  document.documentElement.className += 'noto-sans';
});

const MOUNT_NODE = document.getElementById('root') as HTMLElement;

ConfigProvider.config({
  theme: {
    primaryColor: PRIMARY_COLOR,
  },
});

notification.config({
  closeIcon: <></>,
  placement: 'top',
});

render(
  <ConfigProvider locale={enUS} autoInsertSpaceInButton={false}>
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <HelmetProvider>
          <React.StrictMode>
            <DndProvider backend={HTML5Backend}>
              <App />
            </DndProvider>
          </React.StrictMode>
        </HelmetProvider>
      </ConnectedRouter>
    </Provider>
  </ConfigProvider>,
  MOUNT_NODE,
);

// Hot reloadable translation json files
if (module.hot) {
  module.hot.accept(['./locales/i18n'], () => {
    // No need to render the App again because i18next works with the hooks
  });
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
