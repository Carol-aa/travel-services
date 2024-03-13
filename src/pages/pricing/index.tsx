/* eslint-disable @typescript-eslint/consistent-type-imports */
import React, { FC, Suspense, useEffect } from 'react';
import { connect, Dispatch } from 'umi';
import { Loading, PricingState } from '@/models/connect';
import PageLoading from './components/pageLoading';

const VisitCard = React.lazy(() => import('./components/visitCard'));
interface PricingProps {
  dispatch: Dispatch;
  pricing: PricingState;
  loading?: boolean;
}

const Dashboard: FC<PricingProps> = ({ pricing, dispatch, loading }) => {
  const { cardSource } = pricing;

  useEffect(() => {
    dispatch({
      type: 'pricing/queryCard',
      payload: {},
    });
  }, []);
  return (
    <div>
      <Suspense fallback={<PageLoading />}>
        <VisitCard totalData={cardSource} loading={loading} />
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
