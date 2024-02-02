import _ from 'lodash';
import React from 'react';
// import urlConfig, { messageConfig } from '@/config/env';
// import { useDispatch, useHistory, useSelector } from 'dva';


const selector = (state) => {
  const { name, roles, companyName, phone, companyId } = state.user;
  const { authCityOption, messageDetailVisible, messageDetailId } = state.global;
  return {
    authCityOption,
    roles,
    name,
    phone,
    companyId,
    companyName,
    messageDetailVisible,
    messageDetailId,
  };
};

function UserMessageWrapper(props) {
  return (
   <>usermessage</>
  );
}

export default <>UserMessageWrapper</>;
