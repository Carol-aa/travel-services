import React from 'react';
import UserSetting from './userSetting';
// import TItle from '@/assets/headerbg.png'
export default function() {
  return (
    <>
      <img src={'../../../assets/logo.png'} alt="" />
      <div style={{ fontSize: 18, color: '#fff' }}>出行服务工作台</div>
      <UserSetting />
    </>
  );
}
