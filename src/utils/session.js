import * as cookie from './cookie';

const SESSION_TIME = 3600000;
const SYSTEM_SESSION_NAME = "SWY_SESSION";
const session = () => {};
session.setAttribute = (attr, value) => {
    let oldSession = JSON.parse(cookie.getCookie(SYSTEM_SESSION_NAME));
    if (oldSession == null) {
        oldSession = new Object();
    }
    oldSession[attr] = value;
    cookie.setCookie(SYSTEM_SESSION_NAME, JSON.stringify(oldSession), SESSION_TIME);
}
session.getAttribute = (attr) => {
    let currentSession = cookie.getCookie(SYSTEM_SESSION_NAME);
    if (currentSession != null && currentSession != "") {
        return JSON.parse(currentSession)[attr];
    }
    return null;
}
session.getSelf = () => {
    let currentSession = cookie.getCookie(SYSTEM_SESSION_NAME);
    if (currentSession != null && currentSession != "") {
        return JSON.parse(currentSession);
    }
    return null;
}
export default session;