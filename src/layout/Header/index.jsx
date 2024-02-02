// /* eslint-disable jsx-a11y/anchor-is-valid */
// import _ from 'lodash';
// import { connect } from 'dva';
// import { Icon, Layout } from 'antd';
// import ImgWebp from '@/components/ImgWebp';
// import { globalViewPure } from '@/pure/viewPure';
import React, { lazy, Suspense } from 'react';
// import User from './User';
// import Search from './Search';
// import './index.less';

// const UserMessage = lazy(() => import(/* webpackChunkName: 'message' */'./UserMessage'));
// const Backlog = lazy(() => import(/* webpackChunkName: 'message' */'./Backlog'));
// const TenantSelectForm = lazy(() => import(/* webpackChunkName: 'merchant' */'@/components/TenantSelectForm'));
// const { Header } = Layout;
// const { helpCenterUrl, ruleCenterUrl } = urlConfig;
// const { indexUrl } = urlConfig;

// @connect((state) => {
//   const { name, brandName, roles, companyName, isSwitchable, companyLogo, phone, companyId, permissions } = state.user;
//   const { grayConfig, authCityOption, messageDetailVisible, messageDetailId } = state.global;
//   return {
//     ...state.layout,
//     authCityOption,
//     roles,
//     name,
//     phone,
//     companyId,
//     brandName,
//     companyName,
//     isSwitchable,
//     companyLogo,
//     permissions,
//     grayConfig,
//     messageDetailVisible,
//     messageDetailId,
//   };
// })
// class ProjectHeader extends React.Component {
//   state = {
//     isModalVisible: false,
//   };

//   showSelectTenant = (isModalVisible) => {
//     this.setState({ isModalVisible });
//   };

//   render() {
//     const { roles, authCityOption, dispatch, name, brandName, isSwitchable, companyLogo, phone, companyId, permissions, grayConfig, messageDetailId, messageDetailVisible } = this.props;
//     const { isModalVisible } = this.state;
//     const info = { username: phone, opNameCn: `${companyId}-${name}` };
//     const getStrFullLength = (str = '') => str.split('').reduce((pre, cur) => {
//       const charCode = cur.charCodeAt(0);
//       if (charCode >= 0 && charCode <= 128) {
//         return pre + 1;
//       }
//       return pre + 2;
//     }, 0);
//     const length = getStrFullLength(brandName);
//     return (
//       <>
//         <Header className="w-header">
//           {/* 0 logo */}
//           <ImgWebp
//             onClick={() => {
//               window.location.href = `${indexUrl}#`;
//               dispatch({
//                 type: 'global/setBreadcrumb',
//                 payload: {
//                   level: 1,
//                   oper: 'update',
//                   params: {
//                     name: '首页',
//                     path: '#/',
//                     level: 1,
//                   },
//                 },
//               });
//             }}
//             className="logo"
//             src="//cdn-v3.honghusaas.com/workbench/fe-static/honghu_logo.png"
//           />
//           {name ? (
//             <div className="header-info">
//               {permissions && permissions['kefu./homepage'] && (
//                 <Search />
//               )}

//               {/* 规则中心 */}
//               <span className="header-anticon learning-center" title="规则中心">
//                 <a href={ruleCenterUrl} target="_blank" rel="noreferrer">
//                   <img width={16} src="//cdn-v3.honghusaas.com/workbench/icon/rule_icon.png" alt="" />
//                 </a>
//               </span>

//               {/* 学习中心 */}
//               <span className="header-anticon learning-center" title="宏鹄学苑">
//                 <a href={helpCenterUrl} target="_blank" rel="noreferrer">
//                   <Icon className="anticon" type="read" />
//                 </a>
//               </span>

//               {/* 通知中心 */}
//               {permissions && permissions['kefu.header/message-center'] && roles.length && (
//                 <div className="header-anticon user-message-wrap" title="消息中心">
//                   <Suspense fallback={<span />}>
//                     <UserMessage />
//                   </Suspense>
//                 </div>
//               )}
//               {/* 1待办 */}
//               <Suspense fallback={<span />}>
//                 <Backlog />
//               </Suspense>

//               {/* 帮助文档 */}
//               <div className="header-anticon help" title="帮助中心">
//                 <a href="#/doc" target="_blank" rel="noreferrer">
//                   <img className="anticon" src="//cdn-v3.honghusaas.com/workbench/bg/help.svg" alt="" />
//                 </a>
//               </div>

//               {/* 2品牌信息 */}
//               <div
//                 className="company-info"
//               >
//                 {isSwitchable ? (
//                   <div onClick={() => {
//                     this.showSelectTenant(true);
//                   }}
//                   >
//                     <img src={companyLogo || '//cdn-v3.honghusaas.com/workbench/bg/default-company-logo.png'} alt="" className="company-logo" />
//                     <span>
//                       {length > 24 ? globalViewPure.ellipsis(brandName, 24) : brandName}
//                       <img className="anticon" src="//cdn-v3.honghusaas.com/workbench/bg/dropdown.png" alt="" />
//                     </span>
//                   </div>
//                 ) : (
//                   <span>
//                     <img src={companyLogo || '//cdn-v3.honghusaas.com/workbench/bg/default-company-logo.png'} alt="" className="company-logo" />
//                     {length > 24 ? globalViewPure.ellipsis(brandName, 24) : brandName}
//                   </span>
//                 )}
//               </div>

//               {/* 3用户名 */}
//               <User />
//             </div>
//           ) : null}
//         </Header>

//         <Suspense fallback={<span />}>
//           <TenantSelectForm companyId={companyId} isPage={false} isModalVisible={isModalVisible} showSelectTenant={this.showSelectTenant} />
//         </Suspense>
//       </>
//     );
//   }
// }

export default <>ProjectHeader</>;
