import React, { lazy, Suspense } from 'react';

const LazyTextViewComponent = lazy(() => import('./textView-component'));

const TextViewComponent = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyTextViewComponent data={''} updateData={function (): void {
      throw new Error('Function not implemented.');
    } } globalFlair='' globalTopic='' {...props} />
  </Suspense>
);

export default TextViewComponent;
