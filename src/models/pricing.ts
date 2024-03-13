import { Effect, Reducer, history } from 'umi';
import { message } from 'antd';
import { queryCard } from '@/services/pricing';

import { ConnectState } from './connect';

export interface PricingState {
  data: DataProps[];
  cardSource: any;
}

interface DataProps {
  id: string;
  name: string;
}

export interface DashboardType {
  namespace: 'pricing';
  state: PricingState;
  effects: {
    queryCard: Effect;
  };
  reducers: {
    save: Reducer<PricingState>;
  };
}

const DashboardModel: DashboardType = {
  namespace: 'pricing',
  state: {
    data: [],
    cardSource: {},
  },
  effects: {
    *queryCard(_, { call, put }) {
      const response = yield call(queryCard);
      yield put({
        type: 'save',
        payload: {
          cardSource: response.data,
        },
      });
    },
  },
  reducers: {
    save(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
    // 启用 immer 之后
    // save(state, action) {
    //   state.name = action.payload;
    // },
  },
};

export default DashboardModel;
