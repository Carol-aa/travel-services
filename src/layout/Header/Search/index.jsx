// import InfiniteScroll from 'react-infinite-scroller';
import React from 'react';
// import { connect } from 'dva';
// import { Dropdown, Input, Spin, Empty } from 'antd';
// import './index.less';
// import classNames from 'classnames';
// import _ from 'lodash';
// import * as home from '@/service/home';
// // import urlConfig from '@/config/env';
// import menus from '@/config/menu';
// import { checkConfigAuth } from '@/utils/menu';
// import searchIcon from '@/assets/icon/search-icon.png';

// const { indexUrl, helpCenterUrl } = urlConfig;

// const menuType = [
//   { label: '全部', value: '' },
//   { label: '工作台功能', value: 1 },
//   { label: '帮助中心', value: 2 },
//   { label: '宏鹄学苑', value: 3 },
// ];


// const encodeSearchResult = (data = [], { permissions, grayConfig, type }) => {
//   return data
//     .filter((item) => {
//       item.source = +item.source;
//       if (item.source === 1) {
//         const { isAuth, config } = checkConfigAuth(item.link, { menus, permissions, grayConfig });
//         item.isAuth = isAuth;
//         item.config = config;
//         return isAuth;
//       }
//       return true;
//     })
//     .map((item) => {
//       const nameArr = _.split(item.name, '-');
//       const lastName = _.last(nameArr);
//       nameArr.pop();
//       const typeName = _.find(menuType, { value: item.source }).label;
//       let sourceName;
//       // 显示搜索详细名称
//       if (type === 1 || type === 2) {
//         sourceName = nameArr.join('-');
//       } else {
//         sourceName = typeName;
//       }
//       return {
//         ...item,
//         lastName,
//         sourceName,
//       };
//     });
// };

// // @connect((state) => {
// //   const { name, permissions } = state.user;
// //   const { grayConfig } = state.global;

// //   return {
// //     name, permissions, grayConfig,
// //   };
// // })
// export default class Search extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       input: '',
//       type: '',
//       loading: false,
//       visible: false,
//       sourceData: [],
//       historyData: [],
//       historypageTotal: 1,
//       historyPage: 1,
//     };
//     this.debounceSearch = _.debounce(this.search, 800);
//   }

//   componentDidMount() {
//     setTimeout(() => {
//       this.getHistory();
//     }, 1500);
//   }

//   search = ({ input, source }) => {
//     const { grayConfig, permissions } = this.props;
//     const search_name = _.trim(input);
//     if (!search_name) {
//       this.setState({ sourceData: [] });
//       return;
//     }
//     this.setState({ loading: true });
//     home.search({ search_name: input, source })
//       .then((res) => {
//         this.setState({ loading: false });
//         if (res.errno === 0) {
//           const sourceData = encodeSearchResult(res.data, { type: source, permissions, grayConfig });
//           console.log(sourceData);
//           this.setState({ sourceData });
//         } else {
//           this.setState({ sourceData: [] });
//         }
//       });
//   }

//   getHistory = (page = 1, pageSize = 15) => {
//     const { grayConfig, permissions } = this.props;
//     const { historyData } = this.state;
//     home.getHistory({
//       page_index: page,
//       page_size: pageSize,
//     })
//       .then((res) => {
//         this.setState({ loading: false });
//         if (res.errno === 0) {
//           const list = encodeSearchResult(res.data?.list, { type: 0, permissions, grayConfig });
//           this.setState({
//             historyPage: page,
//             historypageTotal: res.data?.page_total || 1,
//             historyData: page === 1 ? list : historyData.concat(list),
//           });
//         } else {
//           this.setState({
//             historyPage: page,
//             historypageTotal: 1,
//             historyData: [],
//           });
//         }
//       });
//   }


//   handerInputChange = (e) => {
//     const input = e?.target?.value;
//     const { type } = this.state;
//     this.setState({ input });
//     this.debounceSearch({ input, source: type });
//   }

//   handerChangeType = (type) => {
//     this.setState({ type });
//     const { input } = this.state;
//     this.search({
//       input, source: type,
//     });
//   }

//   handerSearch = () => {
//     this.inputRef.input.focus();
//     const { input, type } = this.state;
//     this.debounceSearch({ input, source: type });
//   }

//   handerSearchResult = (item, isHistory) => {
//     const { input } = this.state;
//     const { dispatch } = this.props;
//     const { id, name, source, link, menu_link_type, config } = item;
//     const params = {
//       source: item.source,
//       search_name: input,
//     };
//     if (source !== 1) {
//       params.snapshot_name = name;
//       params.snapshot_link = link;
//     } else {
//       params.search_id = id;
//     }
//     if (isHistory) {
//       home.updateRecordTime({ id }).then((res) => {
//         if (res.errno === 0) {
//           this.getHistory();
//         }
//       });
//     } else {
//       home.addHistory(params).then((res) => {
//         if (res.errno === 0) {
//           this.getHistory();
//         }
//       });
//     }


//     this.handleVisibleChange(false);
//     let url;
//     let url_type = menu_link_type;
//     switch (source) {
//       case 1:
//         url = `${indexUrl}#${link}`;
//         break;
//       case 2:
//         url = `${indexUrl}#/doc?fileId=${link}`;
//         url_type = 2;
//         break;
//       case 3:
//         url = `${helpCenterUrl}#/learning/space${link}`;
//         url_type = 2;
//         break;
//       default:
//         break;
//     }
//     if (url) {
//       switch (+url_type) {
//         case 1:
//           window.location.href = url;
//           console.log(config);
//           if (config.level) {
//             dispatch({
//               type: 'global/setBreadcrumb',
//               payload: {
//                 level: 2,
//                 oper: 'update',
//                 params: {
//                   name: config.name,
//                   path: `#${link}`,
//                   level: 2,
//                 },
//               },
//             });
//           }
//           break;
//         case 2:
//           window.open(url, '_blank');
//           break;
//         default:
//           break;
//       }
//     }
//   }

//   nextHistoryPage = (index) => {
//     const { historyPage } = this.state;
//     console.log(historyPage, index);
//     this.getHistory(historyPage + 1);
//   }

//   handleVisibleChange = (flag) => {
//     setTimeout(() => {
//       if (document.activeElement === this.inputRef.input) {
//         this.setState({ visible: true });
//         return;
//       }
//       this.setState({ visible: flag });
//     });
//   }

//   clearHistory = () => {
//     this.setState({ loading: true });
//     home.clearHistory().then(() => {
//       this.getHistory();
//     });
//   }

//   getMenu = () => {
//     return menuType;
//   }

//   render() {
//     const { sourceData, visible, input, historyData, historypageTotal, historyPage, loading, type } = this.state;
//     const isHistory = _.trim(input) === '';
//     const isEmpty = isHistory ? historyData.length === 0 : sourceData.length === 0;

//     const dropdownMenu = (
//       <div className="search-result-warpper" onClick={e => e.preventDefault()}>
//         <div className="search-result-head">
//           {
//             isHistory ? (
//               <div>
//                 <span
//                   className="search-result-type active"
//                 >
//                   最近搜索
//                 </span>
//                 <span
//                   className="clear-history"
//                   onClick={() => {
//                     this.clearHistory();
//                   }}
//                 >
//                   清空搜索历史
//                 </span>
//               </div>
//             ) : this.getMenu().map(({ value, label }) => (
//               <span
//                 className={classNames(['search-result-type', { active: value === type }])}
//                 onClick={() => {
//                   this.handerChangeType(value);
//                 }}
//                 key={label}
//               >
//                 {label}
//               </span>
//             ))
//           }

//         </div>
//         <Spin spinning={loading}>
//           <div className="search-result-body">
//             {isEmpty && (
//               <div className="is-empty">
//                 <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={isHistory ? '暂无搜索记录' : '暂无信息'} />
//               </div>
//             )}
//             <InfiniteScroll
//               pageStart={0}
//               loadMore={this.nextHistoryPage}
//               hasMore={false || historyPage < historypageTotal}
//               useWindow={false}
//               loader={(
//                 <Spin key={1} spinning>
//                   <div style={{ height: 32 }} />
//                 </Spin>
//               )}
//             >
//               {_.map(isHistory ? historyData : sourceData, item => (
//                 <div
//                   className="search-result-item"
//                   key={item.id}
//                   onClick={() => this.handerSearchResult(item, isHistory)}
//                 >
//                   <div className="name ellipsis">{item.lastName}</div>
//                   <div className="source ellipsis">{item.sourceName}</div>
//                 </div>
//               ))}
//             </InfiniteScroll>

//           </div>
//         </Spin>
//       </div>

//     );

//     return (
//       <div className="header-search">
//         <Dropdown
//           overlay={dropdownMenu}
//           trigger={['click']}
//           placement="bottomLeft"
//           onVisibleChange={this.handleVisibleChange}
//           visible={visible}
//           overlayClassName="header-search-dropdown"
//         >
//           <div
//             className="input-warpper"
//           >
//             <Input
//               ref={(ref) => { this.inputRef = ref; }}
//               className="header-search-input"
//               placeholder="请输入关键词查找相关功能"
//               onChange={this.handerInputChange}
//               onClick={e => e.preventDefault()}
//             />
//             <div
//               className="search-icon"
//             >
//               <img className="icon" src={searchIcon} onClick={this.handerSearch} width="16px" height="16px" alt="" />
//             </div>

//           </div>
//         </Dropdown>
//       </div>
//     );
//   }
// }
export default<>Search</>
