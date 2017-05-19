import config from '../utils/config';
import http from '../utils/HttpUtil';
import * as userService from '../services/user';
import session from '../utils/session';
import { routerRedux } from 'dva/router'
/*namespace为此model暴露给整个应用的入口，state为初始值，React组件的getInitialState的值可以由此初始化，reducers为接口
下的各个方法，当前配置即可用loginForm/submit来调用这个submit方法，与之前(src/routes/Login.js中的dispatch路径一致)*/
export default {
  namespace: 'index',
  state: {
    user:null
  },
  reducers: {
    save(state, {payload:value}) {
      return { ...state, ...value};
    },
  },
  effects: {
    *checkLogin({ payload }, { call, put } ) {
      let user = yield session.getAttribute("user");
      if (user == null || user == "") {
        yield put(routerRedux.push("/login"));
      }else{
        yield put({ type:'save', payload: { user } });
      }
    },
  },
  subscriptions: {
    setup ({ dispatch }) {
      dispatch({ type: 'checkLogin' })
    },
  },
};
