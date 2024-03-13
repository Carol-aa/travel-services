// eslint-disable-next-line import/no-extraneous-dependencies
import { Request, Response } from 'express';

export default {
  'POST  /api/userInfo': (req: Request, res: Response) => {
    const { userid } = req.body;
    if (userid) {
      res.send({
        status: 'ok',
        data: {
          username: '阅客出行',
          userid: 'abc456efdd',
        },
      });
      return;
    }
    res.send({
      status: 'error',
      data: {
        username: 'guest',
        userid: 'sdfsdfewfds',
      },
    });
  },
};
