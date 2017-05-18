import { message } from 'antd';
import {MANAGE_SERVICE_HOST, MANAGE_SERVICE_PORT} from '../utils/config';
import http from '../utils/HttpUtil';
/*namespace为此model暴露给整个应用的入口，state为初始值，React组件的getInitialState的值可以由此初始化，reducers为接口
下的各个方法，当前配置即可用loginForm/submit来调用这个submit方法，与之前(src/routes/Login.js中的dispatch路径一致)*/
message.config({
  top: 100,
  duration: 1.5,
});
export default {
  namespace: 'loginForm',
  state: [],
  reducers: {
  'submit'(state, { payload: {username, password}}) {
      http.post({
        host:MANAGE_SERVICE_HOST,
        port:MANAGE_SERVICE_PORT,
        path:"/login",
        data:{username:username, password:password},
        success:(chunk) => {
          let data = JSON.parse(chunk);
          if (data.flag && data.obj) {
            window.location.href = '/#/index';
          }else{
            message.error('登陆失败,用户名或密码错误');
          }
        }
      });
      return state;
    },
  },
};
