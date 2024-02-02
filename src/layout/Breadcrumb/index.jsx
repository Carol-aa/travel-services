import React from 'react';
import { Breadcrumb, Icon, Alert } from 'antd';
import { connect } from 'dva';
import './index.less';

// @connect((state) => {
//   const { breadcrumb } = state.global;
//   return {
//     breadcrumb,
//   };
// })

// export default class Wbreadcrumb extends React.Component {
//   componentDidMount() {
//     window.addEventListener('message', (e) => {
//       const { dispatch } = this.props;
//       const { key, payload = {} } = e.data;
//       const { level, oper, name, path } = payload;
//       // 内嵌页面修改面包屑
//       if (key === 'changeBreadcrumb') {
//         dispatch({
//           type: 'global/setBreadcrumb',
//           payload: {
//             level,
//             oper,
//             params: {
//               name,
//               path,
//               level,
//             },
//           },
//         });
//         // 返回changeBreadcrumbSuccess消息,告知面包屑修改成功
//         e && e.source && e.source.postMessage('changeBreadcrumbSuccess', e.origin);
//         // 刷新组件
//         this.forceUpdate();
//       }
//     });
//   }

//   handleBreadcrumbClick = (item) => {
//     const { dispatch, breadcrumb } = this.props;
//     // 记录跳转之前链接
//     const prePath = breadcrumb[breadcrumb.length - 1].path.split('?')[0];
//     let fmtPath;
//     if (item.name === '首页') {
//       fmtPath = '#/';
//     } else if (item.path.indexOf('#') === -1) {
//       fmtPath = `#${item.path}`;
//     } else {
//       fmtPath = item.path;
//     }
//     // 修改面包屑
//     dispatch({
//       type: 'global/setBreadcrumb',
//       payload: {
//         level: item.level,
//         oper: 'update',
//         params: {
//           name: item.name,
//           level: item.level,
//           path: fmtPath,
//         },
//       },
//     });
//     dispatch({
//       type: 'layout/updateStore',
//       payload: {
//         pathName: prePath,
//       },
//     });
//     // 通知内嵌页面
//     const iframeDoms = document.getElementsByTagName('iframe');
//     const target = iframeDoms && iframeDoms[0] ? iframeDoms[0] : null;
//     if (target) {
//       // const origin = ['https://static-pre.honghusaas.com/', 'https://static.honghusaas.com/'];
//       target.contentWindow.postMessage('accessDriverListSuccess', '*');
//       // 刷新组件
//       this.forceUpdate();
//     }
//   };

//   goBack = () => {
//     const { dispatch, breadcrumb } = this.props;
//     const index = breadcrumb.length - 1;
//     // 记录跳转之前链接
//     const prePath = breadcrumb[breadcrumb.length - 1].path.split('?')[0];
//     // 修改面包屑
//     dispatch({
//       type: 'global/setBreadcrumb',
//       payload: {
//         level: index - 1,
//         oper: 'update',
//         params: breadcrumb[index - 1],
//       },
//     });
//     dispatch({
//       type: 'layout/updateStore',
//       payload: {
//         pathName: prePath,
//       },
//     });
//     window.location.href = breadcrumb[index - 1].path;
//     // 通知内嵌页面
//     const iframeDoms = document.getElementsByTagName('iframe');
//     const target = iframeDoms && iframeDoms[0] ? iframeDoms[0] : null;
//     if (target) {
//       // const origin = ['https://static-pre.honghusaas.com/', 'https://static.honghusaas.com/'];
//       target.contentWindow.postMessage('clickBackSuccess', '*');
//       // 刷新组件
//       this.forceUpdate();
//     }
//   };

//   render() {
//     const { breadcrumb } = this.props;

//     // 对于线上/预发数据不隔离的模块，需要增加用户提示
//     let noOnlineData = false;
//     const path = window.location.hash;
//     onlineModules.map(module => {
//       if (path.indexOf(module.path) !== -1) {
//         noOnlineData = true;
//       }
//     });

//     return (
//       <div>
//         <Breadcrumb className="w-breadcrumb">
//           <div className="w-breadcrumb-container">
//             {breadcrumb.map((item, index) => {
//               if (!item) {
//                 return null;
//               }
//               // 返回逻辑
//               if (item?.level === 0) {
//                 return item.hasGoBack ? (
//                   <Breadcrumb.Item key={item.path} className="go-back" onClick={this.goBack}>
//                     <Icon type="left" />
//                     {item.name}
//                   </Breadcrumb.Item>
//                 ) : null;
//               }
//               if (index === breadcrumb?.length - 1) {
//                 // 当前页面
//                 return <Breadcrumb.Item key={item.path}>{item.name}</Breadcrumb.Item>;
//               }
//               return (
//                 <Breadcrumb.Item key={item.path} onClick={() => this.handleBreadcrumbClick(item)}>
//                   <a href={item.path}>{item.name}</a>
//                 </Breadcrumb.Item>
//               );
//             })}
//             <span className="pre-data-tips">
//               {isPre && !noOnlineData
//             && <Alert type="warning" showIcon className="mb-12" message="当前页面连接线上生产环境，请谨慎操作（新建、修改等）避免影响线上" />}
//             </span>
//           </div>
//         </Breadcrumb>
//       </div>
//     );
//   }
// }

export default <>Wbreadcrumb</>
