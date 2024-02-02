/* eslint-disable consistent-return */
import { Route, Switch, Router } from 'react-router-dom';
import React, { Suspense, lazy } from 'react';
import { connect } from 'dva';
import Layout from '@/layout/BasicLayout';
// import Login from '@/layout/Login';
// import TenantSelect from '@/layout/TenantSelect';
// import NoMatch from '@/layout/NoMatch';
// import Doc from '@/layout/Doc';
// import BrandPage from '@/layout/BrandPage';
// import Report from '@/layout/Report';
import allMenus from '@/config/menu';
import routes from '@/config/routes';
const menu = allMenus;
let timer;
import ErrorBoundary from '@/components/ErrorBoundary';

// @connect((state) => {
//   const { permissions, companyId } = state.user;
//   const { grayConfig } = state.global;
//   return {
//     permissions,
//     grayConfig,
//     companyId
//   };
// })
class RenderRouter extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      paths: []
    };
  }

  // componentDidMount() {
  //   this.getPermissions();// 获取权限，动态加载路由
  //   this.getUser();
  // }

  // componentWillUnmount() {
  //   clearInterval(timer);
  //   this.setState = () => false;
  // }

  // 获取用户信息
  getUser = () => {
    const { dispatch } = this.props;
    dispatch({ type: 'user/getUser' }).then(({ data }) => {
      initConfig(data);
    });
  };


  // 获取待办数量
  getTodoCount = async () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'driverTeam/getMarketingTodoCount',
    });
    timer = setInterval(() => {
      dispatch({
        type: 'driverTeam/getMarketingTodoCount',
      });
    }, 60000);
  };

  initByPermissions = (permissions) => {
    sessionStorage.setItem('permissions', JSON.stringify(permissions || {}));
    window.permissions = permissions || {};
    const paths = this.refinePaths(menu, '');
    this.setState({ paths });
  }

  getPermissions = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'global/getPermissionAndGrayCache',
    }).then(([grayConfig, permissions]) => {
      this.getTodoCount();
      // 如果是灰度商户 则获取评分配置
      // (r[1].data || {}).user_score && this.getScoreConfig();
      this.getScoreConfig();
      // 获得新菜单后，初始化时长统计
      initPageTime(menu);
      if (permissions) {
        this.initByPermissions(permissions);
      }
      dispatch({
        type: 'global/getPermissionAndGray',
      }).then(([res1, res2]) => {
        if (!permissions || !grayConfig) {
          // 没有缓存直接初始化
          this.initByPermissions(res1.data);
        }
        if (!isShallowSameObj(permissions, res2.data) || !isShallowSameObj(grayConfig, res1.data)) {
          // 为false，则说明有变化，重新进行渲染
          this.initByPermissions(res2.data);
        }
      });
    });
  }

  refinePaths = (menus, parentPath) => {
    const { permissions, grayConfig, companyId } = this.props;
    return menus.reduce((pre, cur) => {
      const isHXZ = +companyId === 1400;
      const hideInHxz = isHXZ && cur.hideInHxz;
      if ((!cur.permission || permissions[cur.permission]) && (!cur.grayRelease || grayConfig[cur.grayRelease]) && !hideInHxz) {
        if (cur.path === '/') {
          return [...pre, cur.path];
        }
        if (cur.children) {
          return [...pre, `${parentPath}/${cur.path}`, ...this.refinePaths(cur.children, `${parentPath}/${cur.path}`)];
        }
        return [...pre, `${parentPath}/${cur.path}`];
      }
      return pre;
    }, []);
  }

  getScoreConfig = async () => {
    const { dispatch } = this.props;
    const res = await getScoreConfig();
    if (res && res.errno === 0) {
      dispatch({
        type: 'user/updateStore',
        payload: {
          comment_active_interval: res.data.comment_active_interval || 0,
          comment_active_codes: res.data.comment_active_codes || [],
        },
      });
    }
  }

  render() {
    const { history, permissions, grayConfig } = this.props;
    const { paths } = this.state;
    return (
      <Router history={history}>
        <Switch>
        <Route path="/13123" render={() => <>234</>} />
        
       
        </Switch>
      </Router>
    );
  }
}


export default ({ history }) => {
  return (
    <RenderRouter history={history} />
  );
};
