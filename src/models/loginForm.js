import { message } from 'antd';
import {MANAGE_SERVICE_HOST, MANAGE_SERVICE_PORT} from '../utils/config';
import { routerRedux } from 'dva/router'
import * as userService from '../services/user';
import session from '../utils/session';
/*namespace为此model暴露给整个应用的入口，state为初始值，React组件的getInitialState的值可以由此初始化，reducers为接口
下的各个方法，当前配置即可用loginForm/submit来调用这个submit方法，与之前(src/routes/Login.js中的dispatch路径一致)*/
message.config({
  top: 100,
  duration: 1.5,
});
export default {
  namespace: 'loginForm',
  state: [],
  reducers: {},
  effects:{
    *'submit'({ payload: values}, {call, put}) {
      let {data} = yield call(userService.login, values);
      if (data.flag && data.obj) {
        yield session.setAttribute("user", data.obj);
        yield put(routerRedux.push('/index'));
      }else if (!data.flag){
        message.error("登录失败，请刷新页面后重新尝试！");
      }else{
        message.error("用户名或密码错误！");
      }
    },
  },
};
