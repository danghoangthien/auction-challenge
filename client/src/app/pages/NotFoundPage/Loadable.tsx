/**
 * Asynchronously loads the component for NotFoundPage
 */

import LoadingIndicator from 'app/components/Loading';
import { lazyLoad } from 'utils/loadable';

export const NotFoundPage = lazyLoad(
  () => import('./index'),
  module => module.NotFoundPage,
  {
    fallback: <LoadingIndicator />,
  },
);
