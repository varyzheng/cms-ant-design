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