/* eslint-disable @typescript-eslint/consistent-type-imports */
import React, {
  FC,
  Suspense,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { connect, Dispatch } from 'umi';
import { Loading, PricingState } from '@/models/connect';
import PageLoading from './components/pageLoading';
import { Button, Form, Select, Table } from 'antd';
import { Date_Type, Product_Type } from '@/constant/pricing';
import './index.less';
import PageTitle from '@/components/PageTitle';
import { CityList } from '@/constant/global';
import DetailModal from './components/detailModal';

const VisitCard = React.lazy(() => import('./components/visitCard'));
interface PricingProps {
  dispatch: Dispatch;
  pricing: PricingState;
  loading?: boolean;
}
const mock = {
  priceData: [
    {
      product_type: 'special', //产品类型
      data_type: 'nomal', //日期类型
      city_id: '1',
      id: 1,
      start_time: '2024-02-17', //开始时间
      end_time: '2024-02-17', //结束时间
    },
    {
      product_type: 'special', //产品类型
      data_type: 'nomal', //日期类型
      city_id: '1',
      id: 2,
      start_time: '2024-02-17', //开始时间
      end_time: '2024-02-17', //结束时间
    },
    {
      product_type: 'quick', //产品类型
      data_type: 'nomal', //日期类型
      city_id: '1',
      id: 3,
      start_time: '2024-02-17', //开始时间
      end_time: '2024-02-17', //结束时间
    },
    {
      product_type: 'special', //产品类型
      data_type: 'nomal', //日期类型
      city_id: '1',
      id: 4,
      start_time: '2024-02-17', //开始时间
      end_time: '2024-02-17', //结束时间
    },
    {
      product_type: 'special', //产品类型
      data_type: 'nomal', //日期类型
      city_id: '1',
      id: 5,
      start_time: '2024-02-17', //开始时间
      end_time: '2024-02-17', //结束时间
    },
    {
      product_type: 'quick', //产品类型
      data_type: 'holiday', //日期类型
      city_id: '1',
      id: 1,
      start_time: '2024-02-17', //开始时间
      end_time: '2024-02-17', //结束时间
    },
  ],
  modalData: {
    product_type: 'special', //产品类型
    data_type: 'nomal', //日期类型
    city_id: 1,
    start_time: '2024-02-17', //生效开始时间
    end_time: '2024-02-17', //结束时间
    nomal: {
      mileage: 3,
      money: 30, //分段里程一口价（单座）
    },

    peak: {
      mileage: 3,
      money: 40, //高峰时期一口价（单座）
    },
  },
};
const Dashboard: FC<PricingProps> = ({ pricing, dispatch, loading }) => {
  // const { cardSource, priceData } = pricing;
  const modalRef = useRef();
  const [modalData, setModalData] = useState({});
  const { priceData } = mock;
  const [form] = Form.useForm();
  const FormItem = Form.Item;

  useEffect(() => {
    onSearch();
  }, []);
  //查看详情
  const getPriceDetails = async (id: number) => {
    // const res = await service.getPriceDetails;

    // const { data, errno } = res || {};
    // if (errno === 0) {
    setModalData(mock.modalData);
    // }
  };
  const onSearch = () => {
    const params = form.getFieldsValue();
    console.log(params, 'params');
    dispatch({
      type: 'pricing/searchPrice',
      payload: params,
    });
  };
  const Search = () => {
    return (
      <div className="price-search">
        <Form form={form} layout="inline">
          <FormItem label="产品类型" name="product_type">
            <Select allowClear options={Product_Type}></Select>
          </FormItem>
          <FormItem label="日期类型" name="data_type">
            <Select allowClear options={Date_Type}></Select>
          </FormItem>
          <FormItem label="城市" name="city_id">
            <Select
              allowClear
              fieldNames={{ label: 'city_name', value: 'city_id' }}
              options={CityList}
            ></Select>
          </FormItem>
        </Form>
        <div className="btn-wrap">
          <Button type="primary" onClick={() => onSearch()}>
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
  const PriceTable = () => {
    const columns = [
      {
        title: 'Id',
        dataIndex: 'id',
      },
      {
        title: '产品类型',
        dataIndex: 'product_type',
        render: (val: string) =>
          Product_Type.find(item => item.value === val)?.label,
      },
      {
        title: '日期类型',
        dataIndex: 'data_type',
        render: (val: string) =>
          Date_Type.find(item => item.value === val)?.label,
      },
      {
        title: '城市',
        dataIndex: 'city_id',
        render: (city: number) =>
          CityList.find(item => +item.city_id === +city)?.city_name,
      },
      {
        title: '开始时间',
        dataIndex: 'start_time',
      },
      {
        title: '结束时间',
        dataIndex: 'end_time',
      },
      {
        title: '操作',
        dataIndex: 'edit',
        render: (_, record: any) => (
          <Button
            onClick={() => {
              getPriceDetails(record.id);
              modalRef?.current?.setOpen(true);
            }}
            type="link"
          >
            查看
          </Button>
        ),
      },
    ];
    return <Table columns={columns} dataSource={priceData}></Table>;
  };
  return (
    <div>
      <Suspense fallback={<PageLoading />}>
        {/* <VisitCard totalData={cardSource} loading={loading} /> */}
        <PageTitle title="计价配置查询"></PageTitle>
        <Search></Search>
        <PriceTable></PriceTable>
        <DetailModal modalData={modalData} ref={modalRef}></DetailModal>
      </Suspense>
    </div>
  );
};

export default connect(
  ({ pricing, loading }: { pricing: PricingState; loading: Loading }) => ({
    pricing,
    loading: loading.effects['pricing/queryCard'],
  }),
)(Dashboard);

// export default connect(({ queryTable }: { queryTable: QueryTableState }) => ({
//   queryTable,
// }))(ListFilterRegion);
