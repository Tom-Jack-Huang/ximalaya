import { Effect, Model } from 'dva-core-ts';
import { Reducer } from 'react';
import storage, { load } from '@/config/storage';
import axios from 'axios';
import { RootState } from '@/models/index';
const category_url = '/mock/11/v1/category';

export interface ICategory {
  id: string;
  name: string;
  classify?: string;
}

interface CategoryModelState {
  myCategory: ICategory[];
  category: ICategory[];
  isEdit: boolean;
}

interface CategoryModel extends Model {
  state: CategoryModelState;
  reducers: {
    setState: Reducer<CategoryModelState, any>;
  };
  effects: {
    loadData: Effect;
    toggle: Effect;
    changeMyCategory: Effect;
  };
}

const initState = {
  myCategory: [
    {
      id: 'home',
      name: '推荐',
    },
    {
      id: 'vip',
      name: 'Vip',
    },
  ],
  category: [],
  isEdit: false,
};

const categoryModel: CategoryModel = {
  namespace: 'category',
  state: initState,
  effects: {
    *loadData(_, { call, put }) {
      const myCategories = yield call(load, { key: 'myCategories' });
      const categories = yield call(load, { key: 'categories' });
      if (myCategories) {
        yield put({
          type: 'setState',
          payload: {
            myCategory: myCategories,
            category: categories,
          },
        });
      } else {
        yield put({
          type: 'setState',
          payload: {
            category: categories,
          },
        });
      }
    },
    *toggle({ payload }, { put, select }) {
      const categorys = yield select(({ category }: RootState) => category);
      if (payload != null) {
        yield put({
          type: 'setState',
          payload: {
            isEdit: payload.isEdit,
          },
        });
      } else {
        yield put({
          type: 'setState',
          payload: {
            isEdit: !categorys.isEdit,
          },
        });
      }
    },
    *changeMyCategory({ payload }, { put }) {
      yield put({
        type: 'setState',
        payload: {
          myCategory: payload.myCategory,
        },
      });
      storage
        .save({
          key: 'myCategories',
          data: payload.myCategory,
        })
        .then((_) => {});
    },
  },
  reducers: {
    setState(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },
  //加载后自动执行
  subscriptions: {
    setup({ dispatch }) {
      dispatch({ type: 'loadData' });
    },
    asyncStorage() {
      storage.sync.categories = async () => {
        const { data } = await axios.get(category_url);
        return data;
      };
      storage.sync.myCategories = async () => {
        return null;
      };
    },
  },
};

export default categoryModel;
