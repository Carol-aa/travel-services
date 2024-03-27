import React, { FC, useEffect, useState } from 'react';
import { connect } from 'umi';
import { Button, Modal, Descriptions, Popconfirm, message } from 'antd';
import TableComponent from '@/components/tableComponent';
import { ColumnsType } from 'antd/es/table';
import { QueryTableState, Loading } from '@/models/connect';
import FilterRegion from './components/filterRegion';
import { QueryTableProps } from './queryTable';
import { CityList } from '@/constant/global';

type RecordType = {
  driver_id: number;
  driver_name: string;
};

const QueryTable: FC<QueryTableProps> = ({ dispatch, queryTable, loading }) => {
  const { queryTableSource } = queryTable;
  const [auditVisible, setVisible] = useState(false);
  const [auditData, setAuditData] = useState<any>({});

  useEffect(() => {
    dispatch({
      type: 'queryTable/queryTableList',
      payload: {},
    });
  }, []);

  const handleAudit = (isAudit: boolean) => {
    const parmas = isAudit ? 1 : 0;
    setVisible(false);
  };
  const handleDelete = (driver_id: number) => {
    message.success('删除成功');
    dispatch({
      type: 'queryTable/queryTableList',
      payload: {},
    });
  };
  const columns: ColumnsType<RecordType> = [
    {
      title: '司机Id',
      key: 'driver_id',
      dataIndex: 'driver_id',
      ellipsis: true,
    },
    {
      title: '司机手机号',
      dataIndex: 'driver_phone',
    },
    {
      title: '司机姓名',
      dataIndex: 'driver_name',
    },
    {
      title: '运营城市',
      dataIndex: 'city_id',
      render: text => CityList.find(item => item.city_id === +text)?.city_name,
    },
    {
      title: '司机出车状态',
      dataIndex: 'car_status',
    },
    {
      title: '车牌号',
      dataIndex: 'License',
    },
    {
      title: '注册时间',
      dataIndex: 'registration_time',
    },
    {
      title: '操作',
      dataIndex: 'option',
      render: (_, record) => (
        <>
          <Button
            type="link"
            onClick={() => {
              setAuditData(record);
              setVisible(true);
            }}
          >
            审核
          </Button>
          <Popconfirm
            title="确认删除吗?"
            onConfirm={() => {
              handleDelete(record?.driver_id);
            }}
            // onCancel={cancel}
            okText="确认"
            cancelText="取消"
          >
            <Button type="link">删除</Button>
          </Popconfirm>
        </>
      ),
    },
  ];
  return (
    <div>
      <FilterRegion />
      <TableComponent
        columns={columns}
        dataSource={queryTableSource}
        rowKey="id"
        loading={loading}
      />
      <Modal
        title="司机信息审核"
        open={auditVisible}
        onCancel={() => setVisible(false)}
        footer={
          <>
            <Button onClick={() => handleAudit(true)} type="primary">
              通过
            </Button>
            <Button onClick={() => handleAudit(false)}>不通过</Button>
          </>
        }
      >
        <Descriptions>
          <Descriptions.Item label="司机Id">
            {auditData?.driver_id}
          </Descriptions.Item>
          <Descriptions.Item label="司机手机号">
            {auditData?.driver_phone}
          </Descriptions.Item>
          <Descriptions.Item label="司机姓名">
            {auditData?.driver_name}
          </Descriptions.Item>
          <Descriptions.Item label="运营城市">
            {CityList.find(item => item.city_id === +auditData?.city_id)
              ?.city_name || '-'}
          </Descriptions.Item>
          <Descriptions.Item label="司机出车状态">
            {auditData?.car_status === 1 ? '已出车' : '未出车'}
          </Descriptions.Item>
          <Descriptions.Item label="车牌号">
            {auditData?.License}
          </Descriptions.Item>
          <Descriptions.Item label="注册时间">
            {auditData?.registration_time}
          </Descriptions.Item>
        </Descriptions>
      </Modal>
    </div>
  );
};

export default connect(
  ({
    queryTable,
    loading,
  }: {
    queryTable: QueryTableState;
    loading: Loading;
  }) => ({
    queryTable,
    loading: loading.models.queryTable,
  }),
)(QueryTable);
