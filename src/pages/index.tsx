import React from 'react';
import { Redirect } from 'umi';

export default () => (
  <Redirect
    to={{
      pathname: '/pricing',
      state: {},
    }}
  />
);
