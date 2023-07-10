/**
 * Asynchronously loads the component for LoadingIndicator
 */
import LoadingIndicator from 'app/components/Loading';
import { lazyLoad } from 'utils/loadable';

const fallback = <LoadingIndicator />;

export const HomePage = lazyLoad(
  () => import(/* webpackChunkName: "HomePage" */ 'app/pages/AppPage/HomePage'),
  module => module.default,
  { fallback, chunkName: 'HomePage' },
);
export const LoginPage = lazyLoad(
  () => import(/* webpackChunkName: "LoginPage" */ 'app/pages/AppPage/LoginPage'),
  module => module.default,
  { fallback, chunkName: 'LoginPage' },
);
export const RegisterPage = lazyLoad(
  () => import(/* webpackChunkName: "RegisterPage" */ 'app/pages/AppPage/RegisterPage'),
  module => module.default,
  { fallback, chunkName: 'RegisterPage' },
);
