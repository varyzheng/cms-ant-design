import config from '../utils/config';
import http from '../utils/HttpUtil';
import * as siwangyinService from '../services/siwangyin';
import session from '../utils/session';
import { dataToEditableData, editableDataToData } from '../utils/DataFormatter';
import { routerRedux } from 'dva/router';
import { message } from 'antd';
/*namespace为此model暴露给整个应用的入口，state为初始值，React组件的getInitialState的值可以由此初始化，reducers为接口
下的各个方法，当前配置即可用loginForm/submit来调用这个submit方法，与之前(src/routes/Login.js中的dispatch路径一致)*/
export default {
  namespace: 'index',
  state: {
    user:null,
    features:null,
    data:null,
    system:null,
    module:null,
    tagList:null
  },
  reducers: {
    save(state, {payload}) {
      return { ...state, ...payload};
    },
    updateUser(state, {payload}) {
      dataToEditableData(state.data);
      return {...state};
    },
    updateNav(state, {payload}) {
      dataToEditableData(state.data);
      return {...state};
    },
    addUser(state) {
      message.success('添加用户成功!');
      return {...state};
    }
  },
  effects: {
    *checkLogin({ payload }, { call, put } ) {
      let user = yield session.getAttribute("user");
      if (user == null || user == "") {
        yield put(routerRedux.push("/login"));
      }else{
        yield put({ type:'save', payload: { user, system:user.system, module:user.module } });
      }
    },
    *changeFeatures({payload}, {call, put}) {
      let chunk;
      switch (payload.features) {
        case 'queryUser':
          chunk = yield call(siwangyinService.queryUser);
          yield put({type:'save', payload:{ data:dataToEditableData(chunk.data), features:payload.features }});
          break;
        case 'addUser':
          yield put({type:'save', payload:{ features:payload.features }});
          break;
        case 'queryNav':
          chunk = yield call(siwangyinService.queryNav);
          yield put({type:'save', payload:{ data:dataToEditableData(chunk.data), features:payload.features }});
          break;
      }
    },
    *changeSystem({payload}, {call, put}) {
      yield put({type:'save', payload:{system:payload.system}});
    },
    *saveUser({payload}, {call, put}) {
      let chunk = yield call(siwangyinService.saveUser, payload);
      if (chunk.data.flag) {
        yield put({type:'updateUser'});
      }
    },
    *addUser({payload}, {call, put}) {
      let chunk = yield call(siwangyinService.addUser, payload);
      if (chunk.data.flag) {
        put({type:'addUser'});
      }
    },
    *saveNav({payload}, {call, put}) {
      let chunk = yield call(siwangyinService.saveNav, payload);
      if (chunk.data.flag) {
        yield put({type:'updateNav'});
      }
    },
    *queryNavTags({payload}, {call, put}){
      let chunk = yield call(siwangyinService.queryNavTags);
      yield put({type:'save', payload:{ tagList:chunk.data }});
    }
  },
  subscriptions: {
    setup ({ dispatch }) {
      dispatch({ type: 'checkLogin' })
    },
  },
};
