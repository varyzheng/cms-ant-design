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
    addUser(state) {
      message.success('添加成功!');
      return {...state};
    },
    updateNav(state, {payload}) {
      dataToEditableData(state.data);
      return {...state};
    },
    addNav(state) {
      message.success('添加成功!');
      return {...state};
    },
    updateTag(state, {payload}) {
      dataToEditableData(state.data);
      return {...state};
    },
    addTag(state) {
      message.success('添加成功!');
      return {...state};
    },
    updateCommodity(state, {payload}) {
      dataToEditableData(state.data);
      return {...state};
    },
    addCommodity(state) {
      message.success('添加成功!');
      return {...state};
    },
    updateArticleSeries(state, {payload}) {
      dataToEditableData(state.data);
      return {...state};
    },
    addArticleSeries(state) {
      message.success('添加成功!');
      return {...state};
    },
    updateArticle(state, {payload}) {
      dataToEditableData(state.data);
      return {...state};
    },
    addArticle(state) {
      message.success('添加成功!');
      return {...state};
    },
    updateNews(state, {payload}) {
      dataToEditableData(state.data);
      return {...state};
    },
    addNews(state) {
      message.success('添加成功!');
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
        case 'addNav':
          chunk = yield call(siwangyinService.queryNav);
          yield put({type:'save', payload:{ data:chunk.data, features:payload.features }});
          break;
        case 'queryTag':
          chunk = yield call(siwangyinService.queryTag);
          yield put({type:'save', payload:{ data:dataToEditableData(chunk.data), features:payload.features }});
          break;
        case 'addTag':
          yield put({type:'save', payload:{ features:payload.features }});
          break;
        case 'queryCommodity':
          chunk = yield call(siwangyinService.queryCommodity);
          yield put({type:'save', payload:{ data:dataToEditableData(chunk.data), features:payload.features }});
          break;
        case 'addCommodity':
          yield put({type:'save', payload:{ features:payload.features }});
          break;
        case 'queryArticleSeries':
          chunk = yield call(siwangyinService.queryArticleSeries);
          yield put({type:'save', payload:{ data:dataToEditableData(chunk.data), features:payload.features }});
          break;
        case 'addArticleSeries':
          yield put({type:'save', payload:{ features:payload.features }});
          break;
        case 'queryArticle':
          chunk = yield call(siwangyinService.queryArticle);
          yield put({type:'save', payload:{ data:dataToEditableData(chunk.data), features:payload.features }});
          break;
        case 'addArticle':
          yield put({type:'save', payload:{ features:payload.features }});
          break;
        case 'queryNews':
          chunk = yield call(siwangyinService.queryNews);
          yield put({type:'save', payload:{ data:dataToEditableData(chunk.data), features:payload.features }});
          break;
        case 'addNews':
          yield put({type:'save', payload:{ features:payload.features }});
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
    *addNav({payload}, {call, put}) {
      let chunk = yield call(siwangyinService.addNav, payload);
      if (chunk.data.flag) {
        put({type:'addNav'});
      }
    },
    *queryNavTags({payload}, {call, put}){
      let chunk = yield call(siwangyinService.queryNavTags);
      yield put({type:'save', payload:{ tagList:chunk.data }});
    },
    *saveTag({payload}, {call, put}) {
      let chunk = yield call(siwangyinService.saveTag, payload);
      if (chunk.data.flag) {
        yield put({type:'updateTag'});
      }
    },
    *addTag({payload}, {call, put}) {
      let chunk = yield call(siwangyinService.addTag, payload);
      if (chunk.data.flag) {
        put({type:'addTag'});
      }
    },
    *queryAllTags({payload}, {call, put}){
      let chunk = yield call(siwangyinService.queryAllTags);
      yield put({type:'save', payload:{ tagList:chunk.data }});
    },
    *saveCommodity({payload}, {call, put}) {
      let chunk = yield call(siwangyinService.saveCommodity, payload);
      if (chunk.data.flag) {
        yield put({type:'updateCommodity'});
      }
    },
    *addCommodity({payload}, {call, put}) {
      let chunk = yield call(siwangyinService.addCommodity, payload);
      if (chunk.data.flag) {
        put({type:'addCommodity'});
      }
    },
    *saveArticleSeries({payload}, {call, put}) {
      let chunk = yield call(siwangyinService.saveArticleSeries, payload);
      if (chunk.data.flag) {
        yield put({type:'updateArticleSeries'});
      }
    },
    *addArticleSeries({payload}, {call, put}) {
      let chunk = yield call(siwangyinService.addArticleSeries, payload);
      if (chunk.data.flag) {
        put({type:'addArticleSeries'});
      }
    },
    *saveArticle({payload}, {call, put}) {
      let chunk = yield call(siwangyinService.saveArticle, payload);
      if (chunk.data.flag) {
        yield put({type:'updateArticle'});
      }
    },
    *addArticle({payload}, {call, put}) {
      let chunk = yield call(siwangyinService.addArticle, payload);
      if (chunk.data.flag) {
        put({type:'addArticle'});
      }
    },
    *queryNews({payload}, {call, put}){
      let chunk = yield call(siwangyinService.queryNews);
      yield put({type:'save', payload:{ tagList:chunk.data }});
    },
    *saveNews({payload}, {call, put}) {
      let chunk = yield call(siwangyinService.saveNews, payload);
      if (chunk.data.flag) {
        yield put({type:'updateNews'});
      }
    },
    *addNews({payload}, {call, put}) {
      let chunk = yield call(siwangyinService.addNews, payload);
      if (chunk.data.flag) {
        put({type:'addNews'});
      }
    }
  },
  subscriptions: {
    setup ({ dispatch }) {
      dispatch({ type: 'checkLogin' })
    },
  },
};
