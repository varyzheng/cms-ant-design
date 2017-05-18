import React from 'react';
import { connect } from 'dva';
import IndexContainer from '../components/IndexContainer';

const Index = ({dispatch, user, system, module, data}) => {
  const checkLogin = () => {
    dispatch({
      type:'index/checkLogin',
      payload:{}
    });
  }
  return(
    <div>
      <IndexContainer checkLogin={checkLogin}/>
    </div>
  );
};

//连接路由和组件
export default connect(({system, module, data}) => ({system, module, data,}))(Index);
