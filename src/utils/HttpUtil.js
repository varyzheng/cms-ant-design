import http from 'http';
import url from 'url';
import querystring from 'querystring';

const HttpUtil = () => {}
HttpUtil.send = (param) => {
    const data = querystring.stringify(param.data);
    const options = {
        hostname: param.host,
        port: param.port,
        path: param.path,
        method: param.type,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Access-Control-Allow-Origin':'*'
        }
    };

    let req = http.request(options, (res) => {
        let message;
        res.setEncoding('utf8');
        res.on('data', (chunk) => {
            message = chunk;
        });
        res.on('end', () => {
            param.success(message);
        });
    });
    req.on('error', (e) => {
        console.log(`请求遇到问题: ${e.message}`);
    });

    req.write(data);
    req.end();
}
HttpUtil.get = (param) => {
    param.type = "GET";
    HttpUtil.send(param);
}
HttpUtil.post = (param) => {
    param.type = "POST";
    HttpUtil.send(param);
}
export default HttpUtil;
