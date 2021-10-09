import { Effect, Model } from 'dva-core-ts';
import { Reducer } from 'react';
import axios from 'axios';
import { RootState } from '@/models/index';

const carousel_url = '/mock/11/v1/carousel';
const guess_url = '/mock/11/v1/guess';
const channel_url = '/mock/11/v1/channel';

export interface ICarousel {
  id: string;
  image: string;
  colors: [string, string];
}

export interface IGuess {
  id: string;
  image: string;
  title: string;
}
export interface IChannel {
  id: string;
  image: string;
  title: string;
  remark: string;
  played: number;
  playing: number;
}

interface HomeState {
  carousel: ICarousel[];
  guess: IGuess[];
  channel: IChannel[];
  page: number;
  hasMore: boolean;
  activeDotIndex: number;
  gradientHid: boolean;
}

interface HomeModel extends Model {
  namespace: 'home';
  state: HomeState;
  reducers?: {
    setState: Reducer<HomeState, any>;
  };
  effects?: {
    getCarouselList: Effect;
    getGuessList: Effect;
    getChannelList: Effect;
  };
}

const initialState = {
  carousel: [],
  guess: [],
  channel: [],
  page: 1,
  hasMore: false,
  activeDotIndex: 0,
  gradientHid: false,
};

const homeModel: HomeModel = {
  namespace: 'home',
  state: initialState,
  reducers: {
    setState(state = initialState, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },
  effects: {
    *getCarouselList(_, { call, put }) {
      const { data } = yield call(axios.get, carousel_url);
      if (data.length > 0) {
        yield put({
          type: 'setState',
          payload: {
            carousel: data,
          },
        });
      }
    },
    *getGuessList(_, { call, put }) {
      const { data } = yield call(axios.get, guess_url);
      yield put({
        type: 'setState',
        payload: {
          guess: data,
        },
      });
    },
    *getChannelList({ callback, payload }, { call, put, select }) {
      const { channel, page } = yield select((state: RootState) => state.home);
      let currentPage = 1;
      if (payload.loadMore) {
        currentPage = page + 1;
      }
      const { data } = yield call(axios.get, channel_url, {
        params: { page: currentPage },
      });
      let array = payload.loadMore
        ? channel.concat(data.results)
        : data.results;
      yield put({
        type: 'setState',
        payload: {
          channel: array,
          page: currentPage,
          hasMore: data.total > array.length,
        },
      });
      if (typeof callback === 'function') {
        callback();
      }
    },
  },
};

export default homeModel;
