import { Effect, Model } from 'dva-core-ts';
import { Reducer } from 'react';
import axios from 'axios';

const album_url = '/mock/11/v1/album/list';

export interface IProgram {
  id: string;
  title: string;
  playVolume: number;
  duration: string;
  date: string;
  serial: number;
}
export interface IAuthor {
  id: string;
  name: string;
  attention: number;
  avatar: string;
  introduction: string;
}
export interface IAlbumModelState {
  id: string;
  title: string;
  summary: string;
  thumbnailUrl: string;
  author: IAuthor;
  introduction: string;
  list: IProgram[];
}

interface AlbumModel extends Model {
  state: IAlbumModelState;
  effects: {
    getAlbumList: Effect;
  };
  reducers: {
    setState: Reducer<IAlbumModelState, any>;
  };
}
const initState: IAlbumModelState = {
  id: '',
  thumbnailUrl: '',
  title: '',
  introduction: '',
  summary: '',
  list: [],
  author: {
    id: '',
    name: '',
    introduction: '',
    attention: 0,
    avatar: '',
  },
};
const albumModel: AlbumModel = {
  namespace: 'album',
  state: initState,
  effects: {
    *getAlbumList({}, { call, put }) {
      const { data } = yield call(axios.get, album_url);
      yield put({
        type: 'setState',
        payload: data,
      });
    },
  },
  reducers: {
    setState(state = initState, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },
};

export default albumModel;
