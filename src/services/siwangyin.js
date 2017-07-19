import request from '../utils/request';

/* User */
export function login({username, password}){
  return request("/service/siwangyin/login", {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({username:username, password:password})
  });
}
export function checkLogin(){
  return request("/service/siwangyin/checkLogin", {
    method: "GET",
    headers: {
      'Content-Type': 'application/json'
    }
  });
}
export function queryUser(){
  return request("/service/siwangyin/queryUser", {
    method: "GET",
    headers: {
      'Content-Type': 'application/json'
    }
  });
}
export function saveUser(payload){
  return request("/service/siwangyin/saveUser", {
    method: "PATCH",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });
}
export function addUser(payload){
  return request("/service/siwangyin/addUser", {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });
}
/* Nav */
export function queryNav(){
  return request("/service/siwangyin/queryNav", {
    method: "GET",
    headers: {
      'Content-Type': 'application/json'
    }
  });
}
export function queryNavTags(){
  return request("/service/siwangyin/queryNavTags", {
    method: "GET",
    headers: {
      'Content-Type': 'application/json'
    }
  });
}
export function saveNav(payload){
  return request("/service/siwangyin/saveNav", {
    method: "PATCH",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });
}
export function addNav(payload){
  return request("/service/siwangyin/addNav", {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });
}
/* Tag */
export function queryTag(){
  return request("/service/siwangyin/queryTag", {
    method: "GET",
    headers: {
      'Content-Type': 'application/json'
    }
  });
}
export function saveTag(payload){
  return request("/service/siwangyin/saveTag", {
    method: "PATCH",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });
}
export function addTag(payload){
  return request("/service/siwangyin/addTag", {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });
}
/* Commodity */
export function queryAllTags(){
  return request("/service/siwangyin/queryAllTags", {
    method: "GET",
    headers: {
      'Content-Type': 'application/json'
    }
  });
}
export function queryCommodity(){
  return request("/service/siwangyin/queryCommodity", {
    method: "GET",
    headers: {
      'Content-Type': 'application/json'
    }
  });
}
export function saveCommodity(payload){
  return request("/service/siwangyin/saveCommodity", {
    method: "PATCH",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });
}
export function addCommodity(payload){
  return request("/service/siwangyin/addCommodity", {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });
}
/* ArticleSeries */
export function queryArticleSeries(){
  return request("/service/siwangyin/queryArticleSeries", {
    method: "GET",
    headers: {
      'Content-Type': 'application/json'
    }
  });
}
export function saveArticleSeries(payload){
  return request("/service/siwangyin/saveArticleSeries", {
    method: "PATCH",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });
}
export function addArticleSeries(payload){
  return request("/service/siwangyin/addArticleSeries", {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });
}
/* Article */
export function queryArticle(){
  return request("/service/siwangyin/queryArticle", {
    method: "GET",
    headers: {
      'Content-Type': 'application/json'
    }
  });
}
export function saveArticle(payload){
  return request("/service/siwangyin/saveArticle", {
    method: "PATCH",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });
}
export function addArticle(payload){
  return request("/service/siwangyin/addArticle", {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });
}
/* News */
export function queryNews(){
  return request("/service/siwangyin/queryNews", {
    method: "GET",
    headers: {
      'Content-Type': 'application/json'
    }
  });
}
export function saveNews(payload){
  return request("/service/siwangyin/saveNews", {
    method: "PATCH",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });
}
export function addNews(payload){
  return request("/service/siwangyin/addNews", {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });
}