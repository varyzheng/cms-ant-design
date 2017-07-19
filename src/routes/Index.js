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
  const addUser = (user) => {
    dispatch({
      type:'index/addUser',
      payload:user
    });
  }
  const saveNav = (nav) => {
    dispatch({
      type:'index/saveNav',
      payload:nav
    });
  }
  const addNav = (nav) => {
    dispatch({
      type:'index/addNav',
      payload:nav
    });
  }
  const saveTag = (tag) => {
    dispatch({
      type:'index/saveTag',
      payload:tag
    });
  }
  const addTag = (tag) => {
    dispatch({
      type:'index/addTag',
      payload:tag
    });
  }
  const saveCommodity = (commodity) => {
    dispatch({
      type:'index/saveCommodity',
      payload:commodity
    });
  }
  const addCommodity = (commodity) => {
    dispatch({
      type:'index/addCommodity',
      payload:commodity
    });
  }
   const saveArticleSeries = (series) => {
    dispatch({
      type:'index/saveArticleSeries',
      payload:series
    });
  }
  const addArticleSeries = (series) => {
    dispatch({
      type:'index/addArticleSeries',
      payload:series
    });
  }
  const saveArticle = (article) => {
    dispatch({
      type:'index/saveArticle',
      payload:article
    });
  }
  const addArticle = (article) => {
    dispatch({
      type:'index/addArticle',
      payload:article
    });
  }
  const saveNews = (news) => {
    dispatch({
      type:'index/saveNews',
      payload:news
    });
  }
  const addNews = (news) => {
    dispatch({
      type:'index/addNews',
      payload:news
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
        saveTag={saveTag}
        addTag={addTag}
        saveCommodity={saveCommodity}
        addCommodity={addCommodity}
        saveArticleSeries={saveArticleSeries}
        addArticleSeries={addArticleSeries}
        saveArticle={saveArticle}
        addArticle={addArticle}
        saveNews={saveNews}
        addNews={addNews}
      />
    </div>
  );
};

//连接路由和组件
export default connect()(Index);
