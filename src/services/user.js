import http from '../utils/HttpUtil';
import {MANAGE_SERVICE_HOST, MANAGE_SERVICE_PORT} from '../utils/config';

export function checkLogin(){
  http.post({
    host:MANAGE_SERVICE_HOST,
    port:MANAGE_SERVICE_PORT,
    path:"/checkLogin",
    success:(chunk) => {
      let data = JSON.parse(chunk);
      console.log("-------------------userService------------");
      console.log(data);
      return data;
    }
  });
}
