import React, { memo, useEffect } from 'react';
import { connect } from 'umi';

import { Input, Form, Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { useQuery, getQuery } from '@/utils/hash-query';
import { cleanData } from '@/utils';

const Search = memo((props: any) => {
  const { dispatch, driverId } = props || {};
  const searchQuery = getQuery();
  const [form] = Form.useForm();
  const shortFormItemLayout = {
    labelCol: { xs: { span: 24 }, sm: { span: 4 } },
    wrapperCol: { xs: { span: 24 }, sm: { span: 18 } },
  };
  const queryInst = useQuery();
  const init = () => {
    const Id = JSON.parse(searchQuery?.search)?.driver_id || '';
    dispatch({
      type: 'baseInformation/updateState',
      payload: {
        driverId: +Id,
      },
    });
    dispatch({
      type: 'baseInformation/search',
    });
  };
  const search = () => {
    form
      .validateFields()
      .then(values => {
        const { driverID } = values || {};
        dispatch({
          type: 'baseInformation/updateState',
          payload: {
            driverId: +driverID,
          },
        });
        dispatch({
          type: 'baseInformation/search',
        });
        queryInst.setQuery({ search: cleanData({}) });
      })
      .catch(err => {});
  };

  useEffect(() => {
    if (JSON.stringify(searchQuery) !== '{}') {
      init();
      const Id = JSON.parse(searchQuery?.search)?.driver_id || '';
      form.setFieldsValue({ driverID: Id });
    }
  }, []);

  return (
    <Form
      form={form}
      onFinish={search}
      className="search-form"
      initialValues={{ driverID: +driverId || '' }}
    >
      <Form.Item
        {...shortFormItemLayout}
        rules={[{ required: true }]}
        name="driverID"
        label="司机id"
      >
        <Input allowClear placeholder="请输入司机ID查询" />
      </Form.Item>
      <Button icon={<SearchOutlined />} onClick={search} type="primary">
        查询
      </Button>
    </Form>
  );
});
const mapStateToProps = (state: { baseInformation: any }) => ({
  ...state.baseInformation,
});

export default connect(mapStateToProps)(Search);
