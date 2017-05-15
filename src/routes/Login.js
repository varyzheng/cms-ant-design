import React from 'react';
import { connect } from 'dva';//路由和组件的连接模块
import LoginForm from '../components/LoginForm';//引入刚刚创建的组件

/*Login为最终页面渲染时使用的组件，在此处应该组合页面中所有用到的组件。
提供了之前定义LoginForm时候必须的submit属性，通过dispatch方法来把
表单的值交给model来处理。type的值为model暴露给全局的接口，payload为传递
的参数名*/
const Login = ({ dispatch }) => {
  const handleSubmit = (values) => {
    dispatch({
      type:'loginForm/submit',
      payload:values
    });
  }
  return(
    <div>
      <LoginForm submit={handleSubmit}/>
    </div>
  );
};
//连接路由和组件
export default connect()(Login);
