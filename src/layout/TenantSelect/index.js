import React from 'react';
import TenantSelectForm from '@/components/TenantSelectForm';
import { getUrlParams } from '@/utils/tools';
import './index.less';

class TenantSelect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalVisible: true,
    };
  }

  showSelectTenant = (flag) => {
    const { redirectUrl } = getUrlParams(window.location.href);
    this.setState({ isModalVisible: flag || false });
    window.location.href = unescape(redirectUrl);
  };

  render() {
    const { isModalVisible } = this.state;
    return (
      <div className="tenant-select-wrap">
        <TenantSelectForm
          isPage
          isModalVisible={isModalVisible}
          showSelectTenant={this.showSelectTenant}
        />
      </div>
    );
  }
}
export default TenantSelect;
