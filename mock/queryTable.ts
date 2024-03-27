// eslint-disable-next-line import/no-extraneous-dependencies
import { Request, Response } from 'express';

export default {
  'POST  /api/queryTableList': (req: Request, res: Response) => {
    setTimeout(() => {
      res.send({
        status: 'ok',
        data: [
          {
            driver_id: 232, //司机Id
            driver_phone: '123456', //司机手机号
            driver_name: 'zhang',
            city_id: '1', //运营城市
            car_status: '2024-02-17', //司机出车状态
            License: '蒙A', //车牌号
            registration_time: '2024-02-17', //注册时间
          },
          {
            driver_id: 3232, //司机Id
            driver_phone: '123456', //司机手机号
            driver_name: 'zhang',
            city_id: '1', //运营城市
            car_status: '2024-02-17', //司机出车状态
            License: '蒙A', //车牌号
            registration_time: '2024-02-17', //注册时间
          },
          {
            driver_id: 7887, //司机Id
            driver_phone: '123456', //司机手机号
            driver_name: 'zhang',
            city_id: '1', //运营城市
            car_status: '2024-02-17', //司机出车状态
            License: '蒙A', //车牌号
            registration_time: '2024-02-17', //注册时间
          },
          {
            driver_id: 12354, //司机Id
            driver_phone: '123456', //司机手机号
            driver_name: 'zhang',
            city_id: '1', //运营城市
            car_status: '2024-02-17', //司机出车状态
            License: '蒙A', //车牌号
            registration_time: '2024-02-17', //注册时间
          },
          {
            driver_id: 21123, //司机Id
            driver_phone: '123456', //司机手机号
            driver_name: 'zhang',
            city_id: '1', //运营城市
            car_status: '2024-02-17', //司机出车状态
            License: '蒙A', //车牌号
            registration_time: '2024-02-17', //注册时间
          },
        ],
      });
    }, 1000);
  },
};
