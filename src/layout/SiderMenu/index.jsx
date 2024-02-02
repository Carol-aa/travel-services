import React, { useState, useRef, useCallback, useEffect } from 'react';
// import { Layout, Menu, Icon, Tooltip } from 'antd';
// import { router, connect } from 'dva';
// import pathToRegexp from 'path-to-regexp';
// import { getMenuData, urlToList, filterNameByPath } from '@/utils/menu';
// import { Tracker } from '@/utils/omega';
// import menuData from '@/config/menu';
// import ImgWebp from '@/components/ImgWebp';


// import './index.less';
// // import

// const { Sider } = Layout;
// const { SubMenu } = Menu;
// const { Link, withRouter } = router;


// export const getFlatMenuKeys = (menu) => {
//   return menu.reduce((keys, item) => {
//     keys.push(item.path);
//     if (item.children) {
//       return keys.concat(getFlatMenuKeys(item.children));
//     }
//     return keys;
//   }, []);
// };

// export const getMenuMatchKeys = (flatMenuKeys, paths) => {
//   return paths.reduce((matchKeys, path) => {
//     return matchKeys.concat(flatMenuKeys.filter(item => pathToRegexp(item).test(path)));
//   }, []);
// };

// @withRouter
// // @connect((state) => {
// //   const { permissions, companyId, companyName, agentId, roles, uid, name, isHxz } = state.user;
// //   const { grayConfig } = state.global;
// //   return {
// //     ...state.layout,
// //     permissions,
// //     companyId,
// //     grayConfig,
// //     companyName,
// //     agentId,
// //     roles,
// //     uid,
// //     name,
// //     isHxz
// //   };
// // })
// export default class SiderMenu extends React.Component {
//   constructor(props) {
//     super(props);
//     this.menus = getMenuData(menuData);
//     this.flatMenuKeys = getFlatMenuKeys(menuData);
//     this.state = {
//       openKeys: [],
//     };
//   }

//   componentDidMount() {
//     this.getAllCityList();
//     this.getAuthCityList();
//     this.getAuthOpenCityList();
//     // this.getGrayConfig();
//     this.getMenuItemPermission();
//   }


//   componentDidUpdate(prevProps) {
//     const { location: { pathname } } = this.props;
//     if (pathname !== prevProps?.location?.pathname) {
//       this.getMenuItemPermission();
//     }
//   }


//   // 获取全部城市列表(api)
//   getAllCityList = async () => {
//     const { dispatch } = this.props;
//     dispatch({
//       type: 'global/getAllCityList',
//     });
//   };

//   getMenuItemPermission = async () => {
//     const {
//       location: { pathname },
//       dispatch,
//     } = this.props;
//     const obj = filterNameByPath(this.menus, pathname);
//     dispatch({
//       type: 'global/updateStore',
//       payload: {
//         currentMenuPermission: obj.permission,
//         currentMenuName: obj.name || '',
//       },
//     });
//   };

//   // 获取用户权限城市列表(api)
//   getAuthCityList = async () => {
//     const { dispatch } = this.props;
//     dispatch({
//       type: 'global/getAuthCityList',
//     });
//   };

//   // 获取用户权限开城城市列表(api)
//   getAuthOpenCityList = async () => {
//     const { dispatch } = this.props;
//     dispatch({
//       type: 'global/getAuthOpenCityList',
//     });
//   };

//   // // 获取灰度配置
//   // getGrayConfig = async () => {
//   //   const { dispatch } = this.props;
//   //   dispatch({
//   //     type: 'global/getGrayConfig',

//   //   });
//   // };

//   // 获取灰度配置
//   getDefaultCollapsedSubMenus = (props) => {
//     const {
//       location: { pathname },
//     } = props || this.props;
//     const matchedKeys = getMenuMatchKeys(this.flatMenuKeys, urlToList(pathname));
//     return matchedKeys;
//   };

//   getSelectedMenuKeys = () => {
//     const {
//       location: { pathname },
//     } = this.props;
//     return getMenuMatchKeys(this.flatMenuKeys, urlToList(pathname));
//   };

//   isMainMenu = (key) => {
//     return this.menus.some(item => key && (item.key === key || item.path === key));
//   };

//   // handleOpenChange = (openKeys) => {
//   //   const lastOpenKey = openKeys[openKeys.length - 1];
//   //   const moreThanOne = openKeys.filter(openKey => this.isMainMenu(openKey)).length > 1;
//   //   this.setState({
//   //     openKeys: moreThanOne ? [lastOpenKey] : [...openKeys],
//   //   });
//   // }

//   conversePath = (path) => {
//     if (path && path.indexOf('http') === 0) {
//       return path;
//     }
//     return `/${path || ''}`.replace(/\/+/g, '/');
//   };

//   getIcon = (icon, name) => {
//     if (icon) {
//       return (
//         <span>
//           <ImgWebp src={IconStrToVar[icon]} className="anticon" />
//           <ImgWebp src={IconStrToVar[`${icon}_active`]} className="anticon anticon-active" />
//           <span>{name}</span>
//         </span>
//       );
//     }
//     return <span>{name}</span>;
//   };

//   getMenuItemPath = (item) => {
//     // console.log(item.path);
//     const path = this.conversePath(item.path);
//     const { target, name, icon } = item;
//     const { location } = this.props;
//     // console.log(name, path, /^https?:\/\//.test(path));
//     if (/^https?:\/\//.test(path)) {
//       return (
//         <a href={path} target={target}>
//           {this.getIcon(icon, name)}
//         </a>
//       );
//     }
//     return (
//       <Link to={path} target={target} replace={path === location.pathname}>
//         <span>
//           {item.name === '首页' ? this.getIcon(item.icon, item.name) : item.name }
//         </span>
//       </Link>
//     );
//   };

//   /*
//    展示字菜单SubMenu
//    */
//   getSubMenuOrItem = (item) => {
//     if (item.children && item.children.some(child => child.name)) {
//       const childrenMenu = this.getNavMenuItems(item.children);
//       if (childrenMenu && childrenMenu.length) {
//         return (
//           <SubMenu title={this.getIcon(item.icon, item.name)} key={item.path}>
//             {childrenMenu}
//           </SubMenu>
//         );
//       }
//       return null;
//     }
//     return (
//       <Menu.Item key={item.path} onClick={e => this.handleMenuClick(item, e)}>
//         {this.getMenuItemPath(item)}
//       </Menu.Item>
//     );
//   };

//   /*
//    获取菜单子节点
//    */
//   getNavMenuItems = (menus) => {
//     const { permissions, grayConfig, isHxz } = this.props;
//     if (!menus || Object.keys(permissions || {}).length === 0) {
//       return [];
//     }

//     // item.hideInMenu:非隐藏；permissions[item.permission]有权限；无灰度控制或者有灰度控制并且是灰度商户才可以看见菜单
//     return menus
//       .filter((item) => {
//         if (item.path === '//' && permissions['kefu./homepage']) {
//           item.hideInMenu = false;
//         }
//         // 部分菜单在花小猪自营商户下隐藏
//         const hideHxzMenu = isHxz && item.hideInHxz;
//         return item.name && !hideHxzMenu && !item.hideInMenu && (item.permission ? permissions[item.permission] : true) && (item.grayRelease ? grayConfig[item.grayRelease] : true);
//       })
//       .map((item) => {
//         const ItemDom = this.getSubMenuOrItem(item);
//         return ItemDom;
//       })
//       .filter(item => item);
//   };

//   // 根据视窗宽度，自适应左侧宽度broken代表是否小于xl
//   changeCollapsed = (broken) => {
//     const { dispatch } = this.props;
//     dispatch({
//       type: 'layout/updateStore',
//       payload: {
//         collapsed: broken,
//       },
//     });
//   };

//   // 导航收缩切换
//   toggle = () => {
//     const { collapsed, dispatch } = this.props;
//     dispatch({
//       type: 'layout/updateStore',
//       payload: {
//         collapsed: !collapsed,
//       },
//     });
//   };

//   // 点击菜单
//   handleMenuClick = (item) => {
//     const { dispatch } = this.props;
//     const obj = filterNameByPath(this.menus, item.path);
//     const nameArray = this.findPath(menuData, item.component, [], item);
//     this.onUploadOmega('查看', item.path, obj);
//     this.onUploadMenuOmega(item.permission, nameArray || []);
//     if (item.level) {
//       dispatch({
//         type: 'global/setBreadcrumb',
//         payload: {
//           level: 2,
//           oper: 'update',
//           params: {
//             name: item.name,
//             path: `#${item.path}`,
//             level: 2,
//           },
//         },
//       });
//     } else if (item.level === 0) {
//       dispatch({
//         type: 'global/setBreadcrumb',
//         payload: {
//           level: 1,
//           oper: 'update',
//           params: {
//             name: '首页',
//             path: '#/',
//             level: 1,
//           },
//         },
//       });
//     }
//   };

//  findPath = (menu, component, arr = [], item) => {
//    if (!component) {
//      return [item.name];
//    }
//    menu.forEach((i) => {
//      if (i.component === component) {
//        arr = arr.concat(i.name);
//      } else if (i.children) {
//        const newArr = this.findPath(i.children, component, arr);
//        if (newArr.length !== arr.length) {
//          arr = arr.concat([i.name], newArr);
//        } else {
//          arr = arr.concat();
//        }
//      }
//    });
//    return arr;
//  };


//   onOpenChange = (keys) => {
//     const { openKeys } = this.state;
//     let path = [];
//     let operation;
//     if (keys.length > openKeys.length) { // 展开
//       path = keys.slice(-1);
//       operation = '展开';
//     } else { // 收起
//       path = openKeys.slice(-1);
//       operation = '收起';
//     }
//     if (!path[0]) return;
//     const obj = filterNameByPath(this.menus, path[0]);
//     this.onUploadOmega(operation, path[0], obj);
//     this.setState({ openKeys: keys });
//   }

//   // 上报菜单点击
//   onUploadOmega = (operation, path, obj) => {
//     const { companyName, companyId, agentId } = this.props;
//     const level = path.split('/').length - 1;
//     Tracker.trackEvent('hh_menu_click_ck', '菜单点击记录', {
//       level,
//       name: obj.name,
//       operation,
//       path,
//       company_name: companyName,
//       company_id: companyId,
//       agent_id: agentId,
//     });
//   }

//   // 上报菜单权限点击
//   onUploadMenuOmega = (permission, nameArray) => {
//     const { companyName, companyId, roles, uid, name } = this.props;
//     Tracker.trackEvent('hh_total_function_ck', '使用权限点人数数据', {
//       company_name: companyName,
//       company_id: companyId,
//       roles: (roles || []).map(i => i.name).join(','),
//       account_id: uid,
//       account_name: name,
//       first_page: nameArray[0] || '',
//       second_page: nameArray[1] || '',
//       third_page: nameArray[2] || '',
//       right_id: permission,
//       right_name: `${nameArray.join('-')}查看`,
//     });
//   }

//   render() {
//     const {
//       collapsed,
//       location: { pathname },
//     } = this.props;
//     const keyArray = pathname.split('/');
//     const pathKey = keyArray.reduce((acc, cur, index) => {
//       if (index !== 0 && index < keyArray.length - 1) {
//         return acc.concat(keyArray.filter((item, idx) => index >= idx && idx !== 0).join('/'));
//       }
//       return acc;
//     }, []);

//     // const pathKey = keyArray.filter((item, index) => index !== 0 && (index < keyArray.length - 1));
//     // const { openKeys } = this.state;
//     // const menuProps = collapsed ? {} : { openKeys };
//     // //路径不匹配时选择最近的menu
//     // let selectedKeys = this.getSelectedMenuKeys();
//     // if (!selectedKeys.length) {
//     //   selectedKeys = [openKeys[openKeys.length - 1]];
//     // }
//     return (
//       <Sider
//         breakpoint="xl"
//         onBreakpoint={(broken) => {
//           this.changeCollapsed(broken);
//         }}
//         trigger={
//           collapsed ? (
//             <div className="collapsed-wrap">
//               <Tooltip title="展开" placement="rightBottom">
//                 <Icon className="trigger" type="menu-unfold" />
//               </Tooltip>
//             </div>
//           ) : (
//             <div className="collapsed-wrap">
//               <Icon className="trigger" type="menu-fold" />
//               <span>收起</span>
//             </div>
//           )
//         }
//         collapsible
//         collapsed={collapsed}
//         onCollapse={this.toggle}
//         width={168}
//         className="w-sider"
//       >
//         <Menu key="menu" mode="inline" onOpenChange={this.onOpenChange} selectedKeys={[pathname]} defaultOpenKeys={pathKey.map(item => `/${item}`)}>
//           {this.getNavMenuItems(this.menus)}
//         </Menu>
//       </Sider>
//     );
//   }
// }

export default <>SiderMenu</>
