# cms-ant-design
### 本示例旨在为刚接触ant-design的朋友快速搭建环境，最快速度地将ant-design中的组件应用到项目中，大部分代码都源自[ant-design官方文档](https://ant.design/docs/react/introduce-cn)。本示例也是公司的后台管理系统源码，持续更新中。您可以访问[博客中的官方文档](https://varyzheng.github.io/cms-ant-design/)以获得更好体验。
### 注：
##### 1.  如果您已经掌握了基本的[React](https://facebook.github.io/react/docs/hello-world.html),[dva](https://github.com/dvajs/dva),[Redux](http://redux.js.org),本文的内容就比较简单了,觉得英文文档麻烦的同学推荐看一下[阮一峰的博客](http://www.ruanyifeng.com/blog/archives.html).
##### 2.  如有问题请随时联系,欢迎各位批评指正. 邮箱:varyzheng@outlook.com

# 目录
### [一. 项目构建与初始化](#step1)  
### [二. 引入antd组件（制作登录页面）](#step2)

# <a name="step1">一. 项目构建与初始化</a>

### 1.安装Node.js  
[点此进入官网下载](https://nodejs.org/en/) ，安装完成后，应该已经自动添加完环境变量，在命令行输入  
`npm -v`
可以查询到npm的版本号
### 2.安装cnpm (推荐安装，速度真的快很多)
`npm install -g cnpm --registry=https://registry.npm.taobao.org`  
安装完成后  
`cnpm -v`  
查看版本号
### 3.安装dva-cli
`cnpm install -g dva-cli`  
安装完成后  
`dva -v`  
查看版本号
### 4.使用`dva new`初始化项目  
进入您想创建项目的位置（Workspace），命令行输入  
`dva new cms-ant-design`  
等待dva初始化项目成功后，  
`cd cms-ant-design`  
`npm start`  
项目启动完毕后，会显示  

>Compiled successfully!  
The app is running at:  
http://localhost:8000/  
Note that the development build is not optimized.  
To create a production build, use npm run build.    

应该会自动打开默认浏览器访问此网址。可以看到dva的启动画面，至此项目初始化构建完毕。  
本项目最终的代码地址在[antd-demo-step1](https://github.com/varyzheng/antd-demo-step1)，可以作为一个空的antd项目来使用。  
下一步就是引入antd。  
# <a name="step2">二. 引入antd组件（制作登录页面）</a>  
##  本节将制作登录页面，来实例演示如何将antd的组件交给dva框架管理。
### 1. 安装antd
通过 npm 安装 antd 和 babel-plugin-import 。babel-plugin-import 是用来按需加载 antd 的脚本和样式的。  
`cnpm install antd babel-plugin-import --save`  
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
#### 3.2 修改src/router.js文件，加入login的路由，并且把默认页面设置为登录页面
``` js
import React from 'react';
import { Router, Route } from 'dva/router';
// import IndexPage from './routes/IndexPage';
import Login from './routes/Login';

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Route path="/" component={Login} />
      <Route path="/login" component={Login} />
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
再次运行`npm start`, 浏览器自动访问首页为登录页，也可访问http://localhost:8000/#/login  
运行截图如图:  
![picture](https://github.com/varyzheng/cms-ant-design/blob/master/src/assets/login1.jpeg)   
下面添加css样式，将登录框居中  
#### 5.1 创建src/routes/Login.css：
```css
/*这里要注意，css中不能使用"-"来间隔单词，会报错，推荐使用驼峰命名，所以my-container => myContainer*/
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
运行截图如图:  
![picture](https://github.com/varyzheng/antd-demo-step2/blob/master/src/assets/loginFial.png)  
到此为止，已经能够将ant-design中的组件应用到自己的网站中并加以样式了。接下来内容是一些更复杂组件的整合与使用。
## 后续内容请持续关注，可以Star一下，给予小弟更多鼓励。