/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
// import { connect } from 'dva';
// import { Badge, Dropdown, Menu } from 'antd';
// import { TODO_MAP } from '@/constant/status';
// // import urlConfig from '@/config/env';

// const { indexUrl } = urlConfig;

// let timer;
// @connect((state) => {
//   const { permissions } = state.user;
//   const { marketingToDoInfo } = state.driverTeam;
//   return {
//     marketingToDoInfo,
//     permissions,
//   };
// })
// class Backlog extends React.Component {
//   state = {
//   };

//   componentDidMount() {
//     // this.getPermissions();
//   }

//   componentWillUnmount() {
//     // clearInterval(timer);
//   }

//   // // 获取用户权限
//   // getPermissions =async () => {
//   //   const { dispatch } = this.props;
//   //   await dispatch({ type: 'user/getPermissions' });
//   //   // this.getTodoCount();
//   // };

//   // // 获取待办数量
//   // getTodoCount = async () => {
//   //   const { permissions, dispatch } = this.props;
//   //   if (permissions && permissions['kefu.driver-team/driver-marketing/approve']) {
//   //     dispatch({
//   //       type: 'driverTeam/getMarketingTodoCount',
//   //     });
//   //     timer = setInterval(() => {
//   //       dispatch({
//   //         type: 'driverTeam/getMarketingTodoCount',
//   //       });
//   //     }, 15000);
//   //   }
//   // };

//   // 修改面包屑
//   handleChangeBreadcumb = (name, path) => {
//     const { dispatch } = this.props;
//     dispatch({
//       type: 'global/setBreadcrumb',
//       payload: {
//         level: 2,
//         oper: 'update',
//         params: {
//           name,
//           path,
//           level: 2,
//         },
//       },
//     });
//   }

//   render() {
//     const { marketingToDoInfo } = this.props;
//     const toDoKeys = Object.keys(marketingToDoInfo || {}).filter(k => !!TODO_MAP[k]);
//     const totalCount = toDoKeys.reduce(
//       (prev, cur) => prev + marketingToDoInfo[cur],
//       0,
//     );

//     const menu = (
//       <>
//         {!!totalCount && <div className="drop-wrap" />}
//         <Menu selectable={false}>
//           {toDoKeys.map((k) => {
//             const item = TODO_MAP[k];
//             let { path } = item;
//             const { permissions } = this.props;

//             // 渠道任务待办跳转，需要根据用户角色进行设置
//             if (item.name === '渠道任务' && permissions['kefu.asset-management/company-management/task-manage'] && !permissions['kefu.asset-management/company-management/my-task-manage']) {
//               path = '#/asset-management/company-management/task-manage';
//             }
//             if (item.name === '渠道任务' && permissions['kefu.asset-management/company-management/my-task-manage'] && !permissions['kefu.asset-management/company-management/task-manage']) {
//               path = '#/asset-management/company-management/my-task-manage';
//             }
//             return marketingToDoInfo[k] && item ? (
//               <Menu.Item key={k} onClick={() => this.handleChangeBreadcumb(item.name, path)}>
//                 <a rel="noopener noreferrer" href={`${indexUrl}${path}`}>
//                   <h1>{item.menu}</h1>
//                   {item.getText(marketingToDoInfo[k])}
//                 </a>
//               </Menu.Item>
//             ) : null;
//           })}
//         </Menu>
//       </>
//     );
//     // 2022.12.13 去掉待办功能的权限限制，对所有角色放开，API层控制权限
//     return (
//       (
//         <span title="待办">
//           <Dropdown overlayClassName="back-log" overlay={menu} placement="bottomRight">
//             <div className="header-anticon todo">
//               <Badge
//                 count={totalCount}
//                 title=""
//                 style={{
//                   right: -5,
//                   marginTop: -1,
//                   backgroundColor: 'rgb(248, 37, 21)',
//                 }}
//               >
//                 <img className="anticon" src="//cdn-v3.honghusaas.com/workbench/bg/todo.svg" alt="" />
//               </Badge>
//             </div>
//           </Dropdown>
//         </span>
//       )
//     );
//   }
// }

export default <>Backlog</>;
