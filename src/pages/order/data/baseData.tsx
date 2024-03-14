import React from 'react';
import { connect } from 'dva';
import { List, Card, Empty } from 'antd';

function BaseData(props: any) {
  const { driverBaseData = {} } = props || {};
  const data = () => [
    {
      title: '今日完单数',
      value: driverBaseData?.finish_cnt || '0',
    },
    {
      title: '今日在线时长',
      value: driverBaseData?.online_dur || '0',
    },
    {
      title: '今日流水',
      value: driverBaseData?.driver_receivable || '0',
    },
    {
      title: 'IPH',
      value: driverBaseData?.iph || '0',
    },
    {
      title: '注册天数',
      value: driverBaseData?.reg_days || '0',
      status: '天',
    },
    {
      title: '7日成交率',
      value: driverBaseData?.accomplish_rate_7d || '0',
      status: '%',
    },
    {
      title: '拒单数',
      value: driverBaseData?.refuse_ord_cnt || '0',
    },
  ];
  return (
    <div className="common-baseInformation baseInformation-List">
      {JSON.stringify(driverBaseData) === '{}' ? (
        <Empty description="暂无数据" />
      ) : (
        <List
          grid={{ gutter: 15, column: 7 }}
          dataSource={data() || []}
          renderItem={item => (
            <List.Item>
              <Card title={item.title}>
                <span className="baseData-item">{item.value}</span>
                <span>{item?.status}</span>
              </Card>
            </List.Item>
          )}
        />
      )}
    </div>
  );
}
const mapStateToProps = (state: {
  baseInformation: any;
  loading: { effects: any };
}) => ({
  ...state.baseInformation,
  loading: state.loading.effects,
});

export default connect(mapStateToProps)(BaseData);
