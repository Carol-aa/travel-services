import React from 'react';
import { connect } from 'dva';
import { Table, Button } from 'antd';

import { Link } from 'react-router-dom';
// import { upmConfig } from '@/config/env-config';

function TableList(props: any) {
  const {
    driverIndex = [],
    detailStatus,
    driverIndexStatus = false,
    baseinformationLimits = false,
  } = props || {};
  const column = [
    {
      title: '司机ID',
      dataIndex: 'driver_id',
    },
    {
      title: '注册城市',
      dataIndex: 'register_city_name',
    },
    {
      title: '司机姓名',
      dataIndex: 'driver_name',
    },
    {
      title: '车牌号',
      dataIndex: 'license',
    },
    {
      title: '注册时间',
      dataIndex: 'register_time',
    },
    {
      title: '听单资质',
      dataIndex: 'listen_order',
      width: 100,
    },
    {
      title: '账号状态',
      dataIndex: 'driver_status',
    },
    {
      title: '操作',
      key: 'detail',
      fix: true,
      render: () =>
        detailStatus ? (
          ''
        ) : (
          <Link to="./baseInformation/details">
            <Button type="primary" size="small">
              详情
            </Button>
          </Link>
        ),
    },
  ];
  return (
    <Table
      // loading={loading['baseInformation/search']}
      columns={column}
      dataSource={driverIndex || []}
      pagination={false}
      scroll={{ x: 'max-content', y: 500 }}
      rowKey={record => record.driver_id}
      // style={{ height: 550 }}
    />
  );
}
const mapStateToProps = (state: {
  baseInformation: any;
  loading: { effects: any };
}) => ({
  ...state.baseInformation,
  loading: state.loading.effects,
});

export default connect(mapStateToProps)(TableList);
