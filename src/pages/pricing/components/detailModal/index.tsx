import {
  Button,
  Modal,
  Form,
  Select,
  DatePicker,
  InputNumber,
  Input,
  message,
} from 'antd';
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react';
import { Date_Type, Product_Type } from '@/constant/pricing';
import { CityList } from '@/constant/global';
import moment from 'moment';
const DetailModal = forwardRef((props: any, ref) => {
  const [modalForm] = Form.useForm();
  const [open, setOpen] = useState(false);
  const [detailDisable, setDisable] = useState(true);
  const { modalData } = props || {};

  const FormItem = Form.Item;
  useEffect(() => {
    const newData = {
      ...modalData,
      start_time: moment(modalData?.start_time),
      end_time: moment(modalData?.end_time),
    };
    modalForm.setFieldsValue(newData);
  }, [modalData]);
  useImperativeHandle(ref, () => ({
    setOpen: (bol: boolean) => {
      setOpen(bol);
    },
  }));
  // 提交弹窗修改信息
  const submitInfo = async () => {
    const formData = modalForm.getFieldsValue();
    const params = {
      ...formData,
      start_time: formData?.start_time.format('YYYY-MM-DD'),
      end_time: formData?.end_time.format('YYYY-MM-DD'),
    };
    // const res = await service.submitInfo(params);
    // const {data,errno} = res
    // if(errno===0){
    message.success('修改成功');
    setDisable(true);
    // }
  };
  console.log(modalData, 'modalData');
  return (
    <Modal
      title={'计价配置详情'}
      className="price-modal"
      open={open}
      onCancel={() => setOpen(false)}
      footer={
        <>
          {detailDisable && (
            <Button onClick={() => setDisable(false)}>修改</Button>
          )}
          {!detailDisable && (
            <Button
              onClick={() => {
                submitInfo();
              }}
            >
              提交
            </Button>
          )}
          {!detailDisable && (
            <Button onClick={() => setDisable(true)}>取消</Button>
          )}
        </>
      }
    >
      <Form disabled={detailDisable} form={modalForm}>
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
        <FormItem name={'start_time'} label="生效开始时间">
          <DatePicker></DatePicker>
        </FormItem>
        <FormItem name={'end_time'} label="生效结束时间">
          <DatePicker></DatePicker>
        </FormItem>
        <FormItem name={'nomal'} label="分段里程一口价">
          <Nomal></Nomal>
        </FormItem>
        <FormItem name={'peak'} label="高峰时期一口价">
          <Nomal></Nomal>
        </FormItem>
      </Form>
    </Modal>
  );
});
const Nomal = (props: any) => {
  const { value: valueItem, onChange } = props;
  return (
    <>
      超过
      <Input
        min={0}
        value={valueItem?.mileage}
        type="number"
        suffix="公里"
      ></Input>
      <Input min={0} value={valueItem?.money} type="number" suffix="元"></Input>
    </>
  );
};
export default DetailModal;
