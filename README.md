# travel-services
出行服务商管理系统


# 前端脚手架

> 使用dva框架，请求库用axios，组件库用antd4

## 开发规范

### 目录规范
- src/index.js   应用入口
- src/router.js  应用路由
- src/styles     全局样式，主题配置
- src/models     全局store
- src/components 共用组件
- src/pages      页面级别组件，以及页面内非共用组件

### 文件命名规范

- 字母全部小写
- 不要带空格
- 用破折号（-）连接单词
- 库文件可用逗点（.），用于体现版本或从属关系

### 代码规范

使用 [airbnb](https://github.com/airbnb/javascript) 规范


## 开发说明

- 整体使用[dva框架](https://dvajs.com/)，状态管理相关内容请参考官方文档
- 关于路由

  在组件中跳转路由`this.props.history.push('/foo')`

  在dva effects 中跳转路由

  ```javascript
  import { routerRedux } from 'dva/router';
  const { push } from routerRedux;
  // ...
  effects: {
    *save(action, { put }) {
      yield put(push('/foo'));
    },
  }
  // ...
  ```

- 关于Code Splitting

  使用[react-router v4](https://reacttraining.com/react-router/web/guides/code-splitting) 中推荐的方案

  ```jsx
  import loadable from '@loadable/component'
  import Loading from './components/Loading'
  // Home 组件会同步加载
  import Home from './pages/Home'
  // Detail 组件会按需加载，加载时显示loading组件的内容
  const Detail = loadable(() => import('./pages/Detail'), {
    fallback: <Loading />
  })
  // ...
  <Route path='/' exact component={Home} />
  <Route path='/detail' render={() => <Detail />} />
  // ...
  ```

- 关于less和antd主题定制
  - 在`src/styles/theme.less`中的变量会覆盖antd中原有的变量定义
  - `src/styles/theme.less`中定义的变量会在编译时通过插件[sass-resources-loader](https://github.com/shakacode/sass-resources-loader)注入到项目中所有less文件头部，所以写less的时候不再需要手动引入主题定义。如果项目中有mixin定义，也可以通过此方式引入
  - postcss默认配置了`autoprefixer`插件，如需其他插件可以自行修改config文件`src/postcss.config.js`
  - 全局样式建议定义在`src/styles/index.less`中，或者通过`src/styles/index.less`引入，组件样式建议跟随组件定义

## 使用说明
开始本地开发
```bash
yarn run start
```
