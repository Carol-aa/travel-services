import React from 'react';
import { connect } from 'dva';
import { Table, Empty } from 'antd';
import _ from 'lodash';

function BaseInformation(props: any) {
  const { driverBasicInfo = [] } = props || {};
  const column = [
    {
      title: '司机ID',
      dataIndex: 'driver_id',
      width: 200,
    },
    {
      title: '注册城市',
      dataIndex: 'register_city_name',
      width: 100,
    },
    {
      title: '司机姓名',
      dataIndex: 'driver_name',
      width: 100,
    },
    {
      title: '车牌号',
      dataIndex: 'license',
      width: 100,
    },
    {
      title: '注册时间',
      dataIndex: 'register_time',
      width: 200,
    },
    {
      title: '听单资质',
      dataIndex: 'listen_order',
      width: 100,
    },
    {
      title: '账号状态',
      dataIndex: 'driver_status',
      width: 100,
    },
  ];
  const getData = () => [driverBasicInfo];

  return (
    <>
      {JSON.stringify(driverBasicInfo) === '{}' ? (
        <Empty description="暂未查询到数据" />
      ) : (
        <div className="baseInformation-table">
          <Table
            columns={column}
            dataSource={getData() || []}
            pagination={false}
            scroll={{ x: 'max-content', y: 500 }}
            rowKey={record => record.driver_id}
          />
        </div>
      )}
    </>
  );
}
const mapStateToProps = (state: {
  baseInformation: any;
  loading: { effects: any };
}) => ({
  ...state.baseInformation,
  loading: state.loading.effects,
});

export default connect(mapStateToProps)(BaseInformation);
