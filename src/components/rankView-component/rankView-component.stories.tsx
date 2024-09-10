/* eslint-disable */
import RankViewComponent from './rankView-component';

import RankViewData, { dummyRankViewData } from "../../interfaces/rankViewDTO";


export default {
  title: "RankViewComponent",
};

export const Default = () => <RankViewComponent data={ [dummyRankViewData] } updateData={function (): void {
  throw new Error('Function not implemented.');
} } />;

Default.story = {
  name: 'default',
  data: 'default',
  useState: 'default'
};
