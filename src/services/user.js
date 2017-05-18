import http from '../utils/HttpUtil';

export function checkLogin(){
  http.get({
    host:"localhost",
    port:8000,
    path:"/service/user/checkLogin",
    success:(chunk) => {
      let data = JSON.parse(chunk);
      console.log("-------------------userService------------");
      console.log(data);
      return data;
    }
  });
}
