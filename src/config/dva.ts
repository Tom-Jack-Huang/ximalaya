import { create, Model } from 'dva-core-ts';
import models from '@/models/index';
import modelExtend from 'dva-model-extend';
import createLoading from 'dva-loading-ts';
import homeModel from '@/models/home';
//创建实例
const app = create();
//加载model对象
models.forEach((model) => {
  app.model(model);
});
app.use(createLoading());
//启动dva
app.start();
//导出
export default app._store;

interface Cached {
  [key: string]: boolean;
}

const cached: Cached = {
  home: true,
};
function registerModel(model: Model) {
  if (!cached[model.namespace]) {
    app.model(model);
    cached[model.namespace] = true;
  }
}

export function createHomeModel(namespace: string) {
  const model = modelExtend(homeModel, { namespace: namespace });
  registerModel(model);
}
