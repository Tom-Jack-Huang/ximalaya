import homeModel from '@/models/home';
import { DvaLoadingState } from 'dva-loading-ts';
import categoryModel from '@/models/category';
import home from '@/models/home';
import album from '@/models/album';
import playerModel from '@/models/player';

const models = [homeModel, categoryModel, album, playerModel];

export type RootState = {
  home: typeof homeModel.state;
  loading: DvaLoadingState;
  category: typeof categoryModel.state;
  album: typeof album.state;
  player: typeof playerModel.state;
} & {
  [ket: string]: typeof home.state;
};

export default models;
