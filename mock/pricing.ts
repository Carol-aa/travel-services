// eslint-disable-next-line import/no-extraneous-dependencies
import { Request, Response } from 'express';

export default {
  'GET /api/pricing/card': (req: Request, res: Response) => {
    setTimeout(() => {
      res.send({
        code: '0',
        data: {
          headCount: 100,
          surveyCount: 200,
          totalCount: 300,
          deadLine: new Date().toLocaleDateString(),
          rate: 22,
          lossRate: 78,
        },
      });
    }, 1500);
    return;
  },
  'POST /api/pricing/searchPrice': (req: Request, res: Response) => {
    setTimeout(() => {
      res.send({
        code: '0',
        data: [
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
            product_type: 'special', //产品类型
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
            product_type: 'nomal', //产品类型
            data_type: 'nomal', //日期类型
            city_id: '1',
            id: 1,
            start_time: '2024-02-17', //开始时间
            end_time: '2024-02-17', //结束时间
          },
        ],
      });
    }, 1500);
    return;
  },
};

// searchPrice
