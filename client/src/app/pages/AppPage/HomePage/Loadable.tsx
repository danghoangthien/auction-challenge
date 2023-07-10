/**
 * Asynchronously loads the component for HomePage
 */

import { LoadingIndicator } from 'app/components/LoadingIndicator';
import { lazyLoad } from 'utils/loadable';

export const HomePage = lazyLoad(
  () => import('./index'),
  module => module.HomePage,
  {
    fallback: <LoadingIndicator />,
  },
);
