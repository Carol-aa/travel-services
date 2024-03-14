import React, { useEffect } from 'react';
import { Tabs, Button, Card, Select, Form, DatePicker } from 'antd';
import { connect } from 'dva';
import './index.less';
import { Link } from 'react-router-dom';

import { SlidersOutlined } from '@ant-design/icons';
import moment from 'moment';
import BaseData from './baseData';
import ThirtyData from './ThirtyData';
// import Account from '@/components/baseInformation/Account';
// import Award from '@/components/baseInformation/Award';
import BaseInfomation from './baseInfomation';
import { useQuery, getQuery } from '@/utils/hash-query';
import { cleanData } from '@/utils';

function Detail(props: any) {
  const { TabPane } = Tabs;
  const { RangePicker } = DatePicker;

  const { dispatch, driverBaseData = {}, driverId = '', actiKey } = props || {};
  const searchQuery = getQuery();
  const queryInst = useQuery();
  const [form] = Form.useForm();
  const quotaLabel = [
    {
      label: '完单数',
      value: 'finish_cnt',
    },
    {
      label: '在线时长',
      value: 'online_dur',
    },
    {
      label: '流水',
      value: 'driver_receivable',
    },
    {
      label: '拒单数',
      value: 'refuse_ord_cnt',
    },
  ];
  const staleLabel = [
    {
      label: '热库数据',
      value: 0,
    },
    {
      label: '历史数据(20180729之前)',
      value: 1,
    },
    {
      label: '历史数据(20180730之后',
      value: 2,
    },
    {
      label: '历史数据(20181124之后)',
      value: 3,
    },
  ];
  const init = () => {
    if (JSON.stringify(searchQuery) === '{}') {
      queryInst.setQuery({
        search: cleanData({ driver_id: driverId, tab: actiKey }),
      });
    } else {
      const Id = JSON.parse(searchQuery?.search)?.driver_id;
      const actKey = JSON.parse(searchQuery?.search)?.tab;
      dispatch({
        type: 'baseInformation/updateState',
        payload: {
          driverId: +Id,
          actiKey: actKey,
        },
      });
    }
    dispatch({
      type: 'baseInformation/searchDetail',
    });
  };
  const onValueChange = (value: string) => {
    dispatch({
      type: 'baseInformation/updateState',
      payload: {
        quotaLabel: value,
      },
    });
    dispatch({
      type: 'baseInformation/searchThirty',
    });
  };
  const submit = (value: any) => {
    dispatch({
      type: 'baseInformation/updateState',
      payload: {
        stale: value?.stale,
        startDate: value?.startTime[0]?.format('YYYY-MM-DD HH:mm:ss') || '',
        endDate: value?.startTime[1]?.format('YYYY-MM-DD HH:mm:ss') || '',
      },
    });
    dispatch({
      type: 'baseInformation/searchTransactionFlow',
    });
  };
  const exra = () => (
    <>
      <Select
        onChange={onValueChange}
        style={{ width: 200, marginRight: 20 }}
        size="small"
        options={quotaLabel}
        defaultValue="finish_cnt"
      />
      <Link to="./history">
        <Button size="small" icon={<SlidersOutlined />}>
          历史明细
        </Button>
      </Link>
    </>
  );

  const accountExtra = () => (
    <Form
      form={form}
      onFinish={submit}
      style={{ display: 'flex' }}
      initialValues={{
        stale: 0,
        startTime: [moment().subtract(6, 'days'), moment()],
      }}
    >
      <Form.Item name="stale" style={{ marginRight: 20, width: 200 }}>
        <Select size="small" options={staleLabel} />
      </Form.Item>
      <Form.Item name="startTime">
        <RangePicker showTime size="small" />
      </Form.Item>
      <Form.Item>
        <Button htmlType="submit" style={{ marginLeft: 20 }} size="small">
          查询
        </Button>
      </Form.Item>
    </Form>
  );
  const changeTab = (key: string) => {
    dispatch({
      type: 'baseInformation/updateState',
      payload: {
        actiKey: JSON.parse(searchQuery?.search)?.tab,
      },
    });
    queryInst.setQuery({
      search: cleanData({ driver_id: driverId, tab: key }),
    });
  };
  useEffect(() => {
    init();
  }, []);
  return (
    <div className="driver_details">
      <Tabs defaultActiveKey="base" className="top-tab" onChange={changeTab}>
        <TabPane tab="司机基本信息" key="base">
          <Card title="司机基本信息" className="baseInformation-detail">
            <BaseInfomation />
          </Card>
          <Card
            title="基础数据"
            className="baseInformation-data"
            extra={<div>更新到{driverBaseData?.stat_date}</div>}
          >
            <BaseData />
          </Card>
          <Card
            title="近30日趋势"
            className="baseInformation-thirty"
            extra={exra()}
          >
            {' '}
            <ThirtyData />
          </Card>
        </TabPane>
      </Tabs>
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

export default connect(mapStateToProps)(Detail);
