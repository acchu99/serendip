import React, { lazy, Suspense } from 'react';

const LazyDataHandlerComponent = lazy(() => import('./data-handler-component'));

const DataHandlerComponent = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyDataHandlerComponent {...props} />
  </Suspense>
);

export default DataHandlerComponent;
