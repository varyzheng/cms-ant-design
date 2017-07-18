import request from '../utils/request';

export function login({username, password}){
  return request("/service/login", {
    method: "POST",
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: JSON.stringify({username:username, password:password})
  });
}
export function checkLogin(){
  return request("/service/siwangyin/checkLogin", {
    method: "GET",
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  });
}
export function queryUser(){
  return request("/service/siwangyin/queryUser", {
    method: "GET",
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  });
}
export function saveUser(payload){
  return request("/service/siwangyin/saveUser", {
    method: "PATCH",
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: JSON.stringify(payload)
  });
}
export function addUser(payload){
  return request("/service/siwangyin/addUser", {
    method: "POST",
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: JSON.stringify(payload)
  });
}
export function queryNav(){
  return request("/service/siwangyin/queryNav", {
    method: "GET",
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  });
}
export function queryNavTags(){
  return request("/service/siwangyin/queryNavTags", {
    method: "GET",
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  });
}
export function saveNav(payload){
  return request("/service/siwangyin/saveNav", {
    method: "PATCH",
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: JSON.stringify(payload)
  });
}
export function addNav(payload){
  return request("/service/siwangyin/addNav", {
    method: "POST",
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: JSON.stringify(payload)
  });
}