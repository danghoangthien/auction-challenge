import React, { lazy, Suspense } from 'react';

interface Opts {
  fallback: React.ReactNode;
  chunkName?: string;
}
type Unpromisify<T> = T extends Promise<infer P> ? P : never;

export const lazyLoad = <T extends Promise<any>, U extends React.ComponentType<any>>(
  importFunc: () => T,
  selectorFunc?: (s: Unpromisify<T>) => U,
  opts: Opts = { fallback: null },
) => {
  let lazyFactory: () => Promise<{ default: U }> = importFunc;

  if (selectorFunc) {
    lazyFactory = () => importFunc().then(module => ({ default: selectorFunc(module) }));
  }

  const LazyComponent = lazyWithRetry(lazyFactory, opts.chunkName);

  return (props: React.ComponentProps<U>): JSX.Element => (
    <Suspense fallback={opts.fallback!}>
      <LazyComponent {...props} />
    </Suspense>
  );
};

const lazyWithRetry = (componentImport, chunkName) =>
  lazy(async () => {
    const pageHasAlreadyBeenForceRefreshed = JSON.parse(
      window.localStorage.getItem(`${chunkName}-has-been-force-refreshed`) || 'false',
    );

    try {
      const component = await componentImport();

      chunkName && window.localStorage.setItem(`${chunkName}-has-been-force-refreshed`, 'false');

      return component;
    } catch (error) {
      if (chunkName && !pageHasAlreadyBeenForceRefreshed) {
        // Assuming that the user is not on the latest version of the application.
        // Let's refresh the page immediately.
        window.localStorage.setItem(`${chunkName}-has-been-force-refreshed`, 'true');
        return window.location.reload();
      }

      // The page has already been reloaded
      // Assuming that user is already using the latest version of the application.
      // Let's let the application crash and raise the error.
      throw error;
    }
  });
