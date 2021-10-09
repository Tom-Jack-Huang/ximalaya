import { Effect, EffectsCommandMap, EffectWithType, Model } from 'dva-core-ts';
import { Reducer } from 'react';
import axios from 'axios';
import { getCurrentTime, getDuration, initPlayer, pause, play, stop } from '@/config/../config/sound';
import { RootState } from '@/models/index';

const show_url = '/mock/11/v1/show';

export interface PlayerModelState {
  id: string;
  soundUrl: string;
  playState: string;
  currentTime: number;
  duration: number;
  previousId: string;
  nextId: string;
  sounds: { id: string; title: string }[];
  title: string;
}

export interface PlayerModel extends Model {
  state: PlayerModelState;
  reducers: {
    setState: Reducer<PlayerModelState, any>;
  };
  effects: {
    getShow: Effect;
    play: Effect;
    pause: Effect;
    watcherCurrentTime: EffectWithType;
    previous: Effect;
    next: Effect;
  };
}

const initialState: PlayerModelState = {
  id: '',
  soundUrl: '',
  playState: '',
  currentTime: 0,
  duration: 0,
  previousId: '',
  nextId: '',
  sounds: [],
  title: '',
};
const delay = (timeout: number) => new Promise((resolve) => setTimeout(resolve, timeout));
function* currentTime({ call, put }: EffectsCommandMap) {
  while (true) {
    yield call(delay, 1000);
    const time = yield call(getCurrentTime);
    yield put({
      type: 'setState',
      payload: {
        currentTime: time,
      },
    });
  }
}

const playerModel: PlayerModel = {
  namespace: 'player',
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
    *getShow({ payload }, { call, put }) {
      const { data } = yield call(axios.get, show_url, { params: { id: payload.id } });
      yield put({
        type: 'setState',
        payload: {
          title: data.title,
        },
      });
      yield call(initPlayer, data.soundUrl);
      yield put({
        type: 'setState',
        payload: {
          id: payload.id,
          soundUrl: data.soundUrl,
          duration: getDuration(),
          title: data.title,
        },
      });

      yield put({
        type: 'play',
      });
    },
    *play(_, { call, put }) {
      yield put({
        type: 'setState',
        payload: {
          playState: 'playing',
        },
      });
      yield call(play);
      yield put({
        type: 'setState',
        payload: {
          playState: 'pause',
        },
      });
    },
    *pause(_, { call, put }) {
      yield call(pause);
      yield put({
        type: 'setState',
        payload: {
          playState: 'pause',
        },
      });
    },
    *previous(_, { call, put, select }) {
      yield call(stop);
      const { id, sounds }: PlayerModelState = yield select(({ player }: RootState) => player);
      const index = sounds.findIndex((item) => item.id === id);
      const currentIndex = index - 1;
      const currentItem = sounds[currentIndex];
      const previousItem = sounds[currentIndex - 1];
      yield put({
        type: 'setState',
        payload: {
          playState: 'pause',
          id: currentItem.id,
          title: currentItem.title,
          previousId: previousItem ? previousItem.id : '',
          nextId: id,
        },
      });
      yield put({
        type: 'getShow',
        payload: {
          id: currentItem.id,
        },
      });
    },
    *next(_, { call, put, select }) {
      yield call(stop);
      const { id, sounds }: PlayerModelState = yield select(({ player }: RootState) => player);
      const index = sounds.findIndex((item) => item.id === id);
      const currentIndex = index + 1;
      const currentItem = sounds[currentIndex];
      const nextItem = sounds[currentIndex + 1];
      yield put({
        type: 'setState',
        payload: {
          playState: 'pause',
          id: currentItem.id,
          title: currentItem.title,
          previousId: id,
          nextId: nextItem ? nextItem.id : '',
        },
      });
      yield put({
        type: 'getShow',
        payload: {
          id: currentItem.id,
        },
      });
    },
    watcherCurrentTime: [
      function* (saga) {
        const { call, take, race } = saga;
        while (true) {
          yield take('play');
          yield race([call(currentTime, saga), take('pause')]);
        }
      },
      { type: 'watcher' },
    ],
  },
};

export default playerModel;
