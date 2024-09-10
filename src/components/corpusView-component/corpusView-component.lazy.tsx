import React, { lazy, Suspense } from 'react';

const LazyCorpusViewComponent = lazy(() => import('./corpusView-component'));

const CorpusViewComponent = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyCorpusViewComponent matrixData={[]} data={[]} updateData={function (): void {
      throw new Error('Function not implemented.');
    } } globalFlair='' globalTopic='' setFlair={function (): void {}} setTopic={function (): void {}} {...props} />
  </Suspense>
);

export default CorpusViewComponent;
