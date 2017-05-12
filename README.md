# cms-ant-design
### 本示例旨在为刚接触ant-design的朋友快速搭建环境，最快速度地将ant-design中的组件应用到项目中，大部分代码都源自[ant-design官方文档](https://ant.design/docs/react/introduce-cn)。本示例也是公司的后台管理系统源码，持续更新中。
### 注：
##### 1.  如果您已经掌握了基本的[React](https://facebook.github.io/react/docs/hello-world.html),[dva](https://github.com/dvajs/dva),[Redux](http://redux.js.org),本文的内容就比较简单了,觉得英文文档麻烦的同学推荐看一下[阮一峰的博客](http://www.ruanyifeng.com/blog/archives.html).
##### 2.  如有问题请随时联系,欢迎各位批评指正. 邮箱:522381613@qq.com

# 一. 项目构建与初始化

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
`cd dva-quickstart`  
`npm start`  
项目启动完毕后，会显示  
Compiled successfully!

The app is running at:

http://localhost:8000/

Note that the development build is not optimized.
To create a production build, use npm run build.  
应该会自动打开默认浏览器访问此网址。可以看到dva的启动画面，至此项目初始化构建完毕，下一步就是引入antd。  
## 后续内容请持续关注，可以Star一下，给予小弟更多鼓励。
