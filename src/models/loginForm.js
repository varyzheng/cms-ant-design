/*namespace为此model暴露给整个应用的入口，state为初始值，React组件的getInitialState的值可以由此初始化，reducers为接口
下的各个方法，当前配置即可用loginForm/submit来调用这个submit方法，与之前(src/routes/Login.js中的dispatch路径一致)*/
export default {
  namespace: 'loginForm',
  state: [],
  reducers: {
    'submit'(state, { payload: {username, password}}) {
        console.log("-----------------username&password----------------");
        console.log(username);
        console.log(password);
      return state;
    },
  },
};
