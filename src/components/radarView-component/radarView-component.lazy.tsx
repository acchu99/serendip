import React, { lazy, Suspense } from 'react';
import DataParserService from '../../services/data-parser.service';

const LazyRadarViewComponent = lazy(() => import('./radarView-component'));

const RadarViewComponent = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyRadarViewComponent data={{
      allTopics: [],
      allFlairs: [],
      selectedTopics: [],
      selectedFlairs: [],
      flairTopicLikelihood: []
    }}
      updateData={function(): void {
        throw new Error('Function not implemented.');
      }
      
      }
      globalFlair=''
      globalTopic=''
      {...props} />
  </Suspense>
);

export default RadarViewComponent;
