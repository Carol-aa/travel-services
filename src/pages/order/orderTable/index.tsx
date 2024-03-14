import React, { memo } from 'react';
import './index.less';
import TableList from './TableList';
import Search from './Search';
export default memo(() => (
  <div className="driver_base_management">
    <div className="baseInformation-search">
      <Search />
    </div>
    <TableList />
  </div>
));
