/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import { Helmet } from 'react-helmet-async';
import { Redirect } from 'react-router';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import AuthService from 'services/AuthService';
import authService from 'services/AuthService';

// STYLE
import { GlobalStyle } from '../styles/global-styles';
// CLIENT PAGE
import { HomePage, LoginPage, RegisterPage } from './pages/Loadable';
import OpenAiPage from './pages/AppPage/OpenAi';
import { NotFoundPage } from './pages/NotFoundPage/Loadable';

const PrivateRoute = ({ component: Component, ...rest }: any) => (
  <Route
    {...rest}
    render={props =>
      authService.isLoggedIn() ? <Component {...props} /> : <Redirect to="/login" />
    }
  />
);
export function App() {
  return (
    <>
      <GlobalStyle />
      <BrowserRouter>
        <Helmet>
          <meta name="app-version" content={process.env.REACT_APP_VERSION || '-'} />
        </Helmet>
        <Switch>
          <Route path="/login" component={LoginPage} />
          <Route path="/register" component={RegisterPage} />
          <PrivateRoute exact path="/" component={HomePage} />
          <Route exact path="/home" component={HomePage} />
          <Route exact path="/openai" component={OpenAiPage} />
          <Route component={NotFoundPage} />
        </Switch>
      </BrowserRouter>
    </>
  );
}
