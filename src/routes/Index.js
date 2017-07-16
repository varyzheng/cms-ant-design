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
  const changeSystem = (system) => {
    dispatch({
      type:'index/changeSystem',
      payload:{system}
    });
  }
  const saveUser = (user) => {
    dispatch({
      type:'index/saveUser',
      payload:user
    });
  }
  const saveNav = (nav) => {
    dispatch({
      type:'index/saveNav',
      payload:nav
    });
  }
  const addUser = (user) => {
    dispatch({
      type:'index/addUser',
      payload:user
    });
  }
  const addNav = (nav) => {
    dispatch({
      type:'index/addNav',
      payload:nav
    });
  }
  return(
    <div>
      <IndexContainer 
        checkLogin={checkLogin} 
        changeFeatures={changeFeatures} 
        changeSystem={changeSystem} 
        saveUser={saveUser} 
        addUser={addUser} 
        saveNav={saveNav}
        addNav={addNav} 
      />
    </div>
  );
};

//连接路由和组件
export default connect()(Index);
