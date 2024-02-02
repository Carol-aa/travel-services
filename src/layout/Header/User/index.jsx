import React from 'react';
import { connect } from 'dva';
import { Dropdown } from 'antd';
import { logout } from '@/utils/tools';
// import urlConfig from '@/config/env';
import ImgWebp from '@/components/ImgWebp';

const { indexUrl } = urlConfig;

// @connect((state) => {
//   const { name, permissions } = state.user;
//   const { grayConfig } = state.global;
//   return {
//     name,
//     permissions,
//     grayConfig,
//   };
// })
class User extends React.Component {
  handleMenuClick = (item) => {
    const { dispatch } = this.props;
    if (item.level) {
      dispatch({
        type: 'global/setBreadcrumb',
        payload: {
          level: 2,
          oper: 'update',
          params: {
            name: item.name,
            path: `#${item.path}`,
            level: 2,
          },
        },
      });
    }
    window.location.href = `${indexUrl}#${item.path}`;
  };

  handleLogout = () => {
    const { dispatch } = this.props;
    dispatch({ type: 'user/initState' });
    logout();
  };

  render() {
    const { name, permissions } = this.props;
    const menu = (
      <div className="user-drop-wrap">
        <div className="user-drop-dropdown-arrow" />
        {permissions['kefu.account-management/add-search'] && (
        <span
          className="user-drop-btn"
          onClick={() => {
            this.handleMenuClick({
              name: '账号管理',
              path: '/account-management/add-search',
              level: 2,
            });
          }}
        >
          <img className="img" src="//cdn-v3.honghusaas.com/workbench/icon/user-management.svg" alt="" />
          <img className="img hover" src="//cdn-v3.honghusaas.com/workbench/icon/user-management-hover.svg" alt="" />
          <span className="text">账号管理</span>
        </span>
        ) }

        {
          permissions['kefu.account-management/role'] && (
          <span
            className="user-drop-btn"
            onClick={() => {
              this.handleMenuClick({
                name: '角色管理',
                path: '/account-management/role',
                level: 2,
              });
            }}
          >
            <img className="img" src="//cdn-v3.honghusaas.com/workbench/icon/role.svg" alt="" />
            <img className="img hover" src="//cdn-v3.honghusaas.com/workbench/icon/role-hover.svg" alt="" />
            <span className="text">角色管理</span>
          </span>
          )
        }

        <span className="user-drop-btn" onClick={this.handleLogout}>
          <img className="img" src="//cdn-v3.honghusaas.com/workbench/icon/logout.svg" alt="" />
          <img className="img hover" src="//cdn-v3.honghusaas.com/workbench/icon/logout-hover.svg" alt="" />
          <span className="text">退出登录</span>
        </span>
      </div>
    );

    return (
      (
        <Dropdown overlay={menu} placement="bottomRight">
          <span className="user-wrap">
            <ImgWebp className="user-logo" src="//cdn-v3.honghusaas.com/workbench/icon/user.png" />
            <span>{name}</span>
            <ImgWebp className="anticon" src="//cdn-v3.honghusaas.com/workbench/bg/dropdown.png" />
          </span>
        </Dropdown>
      )
    );
  }
}

export default <>User</>;
