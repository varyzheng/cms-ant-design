import React from 'react';
import { connect } from 'dva';
import IndexContainer from '../components/IndexContainer';

const Index = ({dispatch, user, features, data}) => {
  const checkLogin = () => {
    dispatch({
      type:'index/checkLogin',
      payload:{}
    });
  }
  const changeFeatures = (features) => {
    dispatch({
      type:'index/changeFeatures',
      payload:{features}
    });
  }
  const saveUser = (user) => {
    dispatch({
      type:'index/saveUser',
      payload:user
    });
  }
  return(
    <div>
      <IndexContainer checkLogin={checkLogin} changeFeatures={changeFeatures} saveUser={saveUser}/>
    </div>
  );
};

//连接路由和组件
export default connect()(Index);
