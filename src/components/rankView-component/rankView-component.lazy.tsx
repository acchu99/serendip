import React, { lazy, Suspense } from 'react';
import { dummyRankViewData } from "../../interfaces/rankViewDTO";

const LazyRankViewComponent = lazy(() => import('./rankView-component'));

const RankViewComponent = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyRankViewComponent data={[dummyRankViewData]} updateData={function (): void {
      throw new Error('Function not implemented.');
    } } {...props} />
  </Suspense>
);

export default RankViewComponent;
