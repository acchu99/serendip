import React, { lazy, Suspense } from 'react';

const LazyCircularpackingViewComponent = lazy(() => import('./circularpackingView-component'));

const CircularpackingViewComponent = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyCircularpackingViewComponent data={[]} {...props} />
  </Suspense>
);

export default CircularpackingViewComponent;
