import request from '../utils/request';

export function login({username, password}){
  return request("/service/user/login", {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({username:username, password:password})
  });
}
export function checkLogin(){
  return request("/service/user/checkLogin", {
    method: "GET",
    headers: {
      'Content-Type': 'application/json'
    }
  });
}
export function queryUser(){
  return request("/service/user/queryUser", {
    method: "GET",
    headers: {
      'Content-Type': 'application/json'
    }
  });
}
export function fetch() {
  return request(`/api/users?_page=1&_limit=5`);
}