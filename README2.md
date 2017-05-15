# 二. 引入antd
##  本节将制作登录页面，来实例演示如何将antd的组件交给dva框架管理。
### 1. 安装antd
通过 npm 安装 antd 和 babel-plugin-import 。babel-plugin-import 是用来按需加载 antd 的脚本和样式的。  
`npm install antd babel-plugin-import --save`  
编辑 .roadhogrc，使 babel-plugin-import 插件生效。  
添加`["import", { "libraryName": "antd", "style": "css" }]`
```roadhogrc
{
  "entry": "src/index.js",
  "env": {
    "development": {
      "extraBabelPlugins": [
        "dva-hmr",
        "transform-runtime",
        ["import", { "libraryName": "antd", "style": "css" }]
      ]
    },
    "production": {
      "extraBabelPlugins": [
        "transform-runtime"
      ]
    }
  }
}
```
### 2. 创建组件 （src/components）

创建LoginForm.js（src/components/LoginForm.js）文件，然后拷贝代码。代码来自[官方文档](https://ant.design/components/form-cn/)（建议先看一下文档最底部Form的API），小弟稍加改动，具体说明参见代码注释.

```js
/*定义一个React组件都有哪些属性，此处官方文档上并未引用，在后边的使用过程中，
控制台报错说明需要单独引用’prop-types'*/
import { PropTypes } from 'prop-types';
import { Form, Icon, Input, Button } from 'antd';//从antd引入要用到的组组件
const FormItem = Form.Item; //表单的每一个input都是一个Form.Item

//判断表单域是否有错误
function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class LoginForm extends React.Component {
  componentDidMount() {
    // 初始化让登录按钮为不可用
    this.props.form.validateFields();
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.submit(values);
      }
    });
  }
  render() {
    const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;

    /*只在用户实际输入后才提示错误，原文档中的userName 都被小弟改成了username,使用官方代码的一定注意这块把userName => username,
    或者改model中的代码username => userName 也一样^_^. 后边的一些提示信息被我改成了中文*/
    const usernameError = isFieldTouched('username') && getFieldError('username');
    const passwordError = isFieldTouched('password') && getFieldError('password');
    return (
      <Form layout="inline" onSubmit={this.handleSubmit}>
        <FormItem
          validateStatus={usernameError ? 'error' : ''}
          help={usernameError || ''}
        >
          {getFieldDecorator('username', {
            rules: [{ required: true, message: '请输入用户名！' }],
          })(
            <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="用户名" />
          )}
        </FormItem>
        <FormItem
          validateStatus={passwordError ? 'error' : ''}
          help={passwordError || ''}
        >
          {getFieldDecorator('password', {
            rules: [{ required: true, message: '请输入密码！' }],
          })(
            <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="密码" />
          )}
        </FormItem>
        <FormItem>
          <Button
            type="primary"
            htmlType="submit"
            disabled={hasErrors(getFieldsError())}
          >
            登录
          </Button>
        </FormItem>
      </Form>
    );
  }
}

/*此处定义了登录组件的submit属性为必须，这是一个方法，即表单的格式验证通过后执行的代码*/
LoginForm.propTypes = {
  submit: PropTypes.func.isRequired
};

/*调用Form.create()API将表单实际创建出来，之前只是定义，现在才是真正的创建，创建后导出以供其他模块调用*/
const HorizontalLoginForm = Form.create()(LoginForm);
export default HorizontalLoginForm;
```

## 3. 创建路由 （src/routes/Login.js  src/router.js）
所谓路由，即是控制页面的URL该调用哪个组件，用户的一个操作该执行什么方法的管理器，在整个前端起一个统筹规划的作用。

#### 3.1 创建src/routes/Login.js
```js
import React from 'react';
import { connect } from 'dva';//路由和组件的连接模块
import LoginForm from '../components/LoginForm';//引入刚刚创建的组件

/*Login为最终页面渲染时使用的组件，在此处应该组合页面中所有用到的组件。
提供了之前定义LoginForm时候必须的submit属性，通过dispatch方法来把
表单的值交给model来处理。type的值为model暴露给全局的接口，payload为传递
的参数名*/
const Login = ({ dispatch }) => {
  const handleSubmit = (values) => {
    dispatch({
      type:'loginForm/submit',
      payload:values
    });
  }
  return(
    <div>
      <LoginForm submit={handleSubmit}/>
    </div>
  );
};
//连接路由和组件
export default connect()(Login);
```
#### 3.2 修改src/router.js文件，加入两行代码
``` js
import React from 'react';
import { Router, Route } from 'dva/router';
import IndexPage from './routes/IndexPage';
import Login from './routes/Login'; //添加此行

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Route path="/" component={IndexPage} />
      <Route path="/login" component={Login} /> //添加此行
    </Router>
  );
}

export default RouterConfig;
```
## 4. 创建model (src/models/loginForm.js src/index.js)

#### 4.1 创建src/models/loginForm.js  
```js
export default {
  namespace: 'loginForm',
  state: [],
  reducers: {
    'submit'(state, { payload: {username, password}}) {
        console.log("-----------------username&password----------------");
        console.log(username);
        console.log(password);
      return state;
    },
  },
};
```

#### 4.2 修改src/index.js，将model注册进到app
```js
import dva from 'dva';
import './index.css';

// 1. Initialize
const app = dva();

// 2. Plugins
// app.use({});

// 3. Model
// app.model(require('./models/example'));
app.model(require('./models/loginForm')); //添加此行注册
// 4. Router
app.router(require('./router'));

// 5. Start
app.start('#root');
```  
## 5.运行调试
再次运行`npm start`, 访问http://localhost:8000/#/login  
运行截图如图:  
![picture](https://github.com/FantasyFiend/cms-ant-design/blob/master/src/assets/login1.jpeg)  
下面添加css样式，将登录框居中  
#### 5.1 创建src/routes/Login.css：
```css
.myContainer{
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: #ddd;
}
form{
    position: absolute;
    top:50%;
    left: 50%;
    margin-top:-16px;
    margin-left:-228px;
    text-align: center;
}
```
#### 5.2 修改Login.js
需要先引入css并通过className属性赋值
```js
import React from 'react';
import { connect } from 'dva';//路由和组件的连接模块
import LoginForm from '../components/LoginForm';//引入刚刚创建的组件
import style from './Login.css'; //引入css，className对应css中的class名称

/*Login为最终页面渲染时使用的组件，在此处应该组合页面中所有用到的组件。
提供了之前定义LoginForm时候必须的submit属性，通过dispatch方法来把
表单的值交给model来处理。type的值为model暴露给全局的接口，payload为传递
的参数名*/
const Login = ({ dispatch }) => {
  const handleSubmit = (values) => {
    dispatch({
      type:'loginForm/submit',
      payload:values
    });
  }
  return(
    <div className={style.myContainer}>
      <LoginForm submit={handleSubmit}/>
    </div>
  );
};
//连接路由和组件
export default connect()(Login);
```  
到此为止，已经能够将ant-design中的组件应用到自己的网站中并加以样式了。接下来内容是一些更复杂组件的整合与使用。
## 后续内容请持续关注，可以Star一下，给予小弟更多鼓励。
