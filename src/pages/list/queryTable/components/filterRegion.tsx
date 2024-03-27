import React, { FC } from 'react';
import { Input, Select, Button, Form, DatePicker } from 'antd';
import { connect } from 'umi';
import { SearchOutlined } from '@ant-design/icons';
import { QueryTableState } from '@/models/connect';
import { QueryTableProps } from '../queryTable';
import { CityList } from '@/constant/global';

const { Option } = Select;

const ListFilterRegion: FC<QueryTableProps> = ({ dispatch, queryTable }) => {
  const [form] = Form.useForm();
  const { searchContentVal, statusVal } = queryTable;

  const onInputChange = (e: any) => {
    dispatch({
      type: 'queryTable/save',
      payload: {
        searchContentVal: e.target.value,
      },
    });
  };
  const onStatusChange = (val: string) => {
    dispatch({
      type: 'queryTable/save',
      payload: {
        statusVal: val,
      },
    });
  };

  const onSearchChange = () => {
    dispatch({
      type: 'queryTable/queryTableList',
      payload: {},
    });
  };

  return (
    <div style={{ marginBottom: 24 }}>
      {/* {
    "driver_id": 21123,//司机Id
    "driver_phone: "123456",//司机手机号
    "city_id": "1",//运营城市
    "car_status": "2024-02-17",//司机出车状态
    "License":"蒙A",//车牌号
    "registration_time":["2024-02-17","2024-02-17"] ,//注册时间
    "activation_time":["2024-02-17","2024-02-17"],//激活时间
    "aduit_status":0 ,//审核状态  0未通过  1已通过
} */}
      <Form form={form} layout="inline">
        <Form.Item name={'driver_id'} label="司机Id">
          <Input></Input>
        </Form.Item>
        <Form.Item name={'driver_phone'} label="司机手机号">
          <Input></Input>
        </Form.Item>
        <Form.Item label="运营城市" name="city_id">
          <Select
            allowClear
            fieldNames={{ label: 'city_name', value: 'city_id' }}
            options={CityList}
          ></Select>
        </Form.Item>
        <Form.Item name={'car_status'} label="司机出车状态">
          <Select
            allowClear
            options={[
              { label: '已出车', value: 1 },
              { label: '未出车', value: 0 },
            ]}
          ></Select>
        </Form.Item>
        <Form.Item name={'License'} label="车牌号">
          <Input></Input>
        </Form.Item>
        <Form.Item name={'registration_time'} label="注册时间">
          <DatePicker.RangePicker></DatePicker.RangePicker>
        </Form.Item>
        <Form.Item name={'activation_time'} label="激活时间">
          <DatePicker.RangePicker></DatePicker.RangePicker>
        </Form.Item>
        <Form.Item name={'aduit_status'} label="审核状态">
          <Select
            allowClear
            options={[
              { label: '已审核', value: 1 },
              { label: '未审核', value: 0 },
            ]}
          ></Select>
        </Form.Item>
      </Form>
      <div className="btn-wrap">
        <Button
          type="primary"
          style={{ marginLeft: 24 }}
          onClick={onSearchChange}
        >
          查询
        </Button>
        <Button
          onClick={() => {
            form.resetFields();
          }}
        >
          清空
        </Button>
      </div>
    </div>
  );
};

export default connect(({ queryTable }: { queryTable: QueryTableState }) => ({
  queryTable,
}))(ListFilterRegion);
