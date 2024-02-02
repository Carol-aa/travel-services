import React, { Suspense } from 'react';
import { Layout, ConfigProvider } from 'antd';
import { connect } from 'dva';
import zhCN from 'antd/es/locale/zh_CN';
import 'moment/locale/zh-cn';
// import { UserFeedback } from '@didi/workspace-universal';
// import urlConfig from '@/config/env';
// import { getScoreConfig } from '@/service/user';
import ProjectHeader from '../Header';
import Sider from '../SiderMenu';
import './index.less';

const Breadcrumb = React.lazy(() => import(/* webpackChunkName: 'merchant' */'../Breadcrumb'));
// const UserScore = React.lazy(() => import(/* webpackChunkName: 'message' */'@/components/userScore'));
const { Content } = Layout;
// @connect(state => ({
//   ...state.layout,
//   ...state.auth,
//   ...state.cityPrice,
//   ...state.user,
//   ...state.global,
// }))
class BasicLayout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
    // 计算fmp上传到mas
    performance.mark('fmp');
  }

  getScoreConfig =async () => {
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

  getCountyOption = (data, valueKey = 'city', labelKey = 'city_name') => {
    const countyOption = [];
    data.map((item) => {
      if (item.county_infos && item.county_infos.length > 0) {
        countyOption.push({
          value: item[valueKey],
          label: item[labelKey],
          children: this.getCountyOption(item.county_infos, 'county', 'county_name'),
        });
      } else {
        countyOption.push({
          value: item[valueKey],
          label: item[labelKey],
        });
      }
      return item;
    });
    return countyOption;
  };

  getCityOption = (data) => {
    const cityOption = [
      {
        value: 0,
        label: '全国',
      },
    ];
    data.map((item) => {
      cityOption.push({
        value: item.city,
        label: item.city_name,
      });
      return item;
    });
    return cityOption;
  };

  // 单独渲染header, 方便有的页面需要隐藏header, 简化render函数
  renderHeader = () => {
    const { history } = this.props;
    return <ProjectHeader history={history} />;
  };

  // 单独渲染sider, 方便有的页面需要隐藏sider, 简化render函数
  renderSider = () => {
    return <Sider />;
  };

  // 单独渲染footer, 方便有的页面需要隐藏footer, 简化render函数
  // renderFooter = () => {
  //   return <Footer />
  // }

  render() {
    const { children, currentMenuName, currentMenuPermission, permissions, comment_active_interval, comment_active_codes } = this.props;
    const isPassiveShow = comment_active_codes.includes(currentMenuPermission);
    // console.log(currentMenuPermission);
    // console.log(comment_active_codes);
    // const appId = '41'; // 工作台线上-工具测试
    // const appKey = 'MTQ0MTE1MTg4MDc2NTY1ODc1';// 工作台线上-工具测试
    // const { baseUrl } = urlConfig;
    // const info = { username: phone, opNameCn: `${companyId}-${name}` };
    return (
      <ConfigProvider locale={zhCN}>
        {/* <UserFeedback appId={appId} appKey={appKey} proxyUrl="/biz-api/v1/workbench/service/access/index" userInfo={info} /> */}
        {this.renderHeader()}
        <div className="w-main" id="w-layout-main">
          {this.renderSider()}
          <section>
            <Suspense fallback={<div className="breadcrumb-placeholder" />}>
              <Breadcrumb />
            </Suspense>
            {/* <h1 className="w-page-heard">{this.renderPageTitle()}</h1> */}
            <Content className="w-content">
              {children}
              {/* {this.renderFooter()} */}
            </Content>
          </section>
          {permissions && permissions['kefu.header/message-center'] && (
            <Suspense fallback={<span />}>
              <UserScore isPassiveShow={isPassiveShow} currentMenuName={currentMenuName} delayTime={comment_active_interval} currentMenuPermission={currentMenuPermission} getScoreConfig={this.getScoreConfig} />
            </Suspense>
          )}
        </div>
      </ConfigProvider>
    );
  }
}

export default <>baseLayout</>;
