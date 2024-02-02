// import {
//     getUser,
//     getTenantList,
//     selectTenant,
//     getPermissions,
//   } from '@/service/user';
//   import { convertHump, isShallowSameObj } from '@/utils/tools';
//   import { TenantType, RoleType } from '@/types/common';
  
//   const logoImg = '//cdn-v3.honghusaas.com/workbench/bg/logo.svg';
//   const cacheUserData = JSON.parse(localStorage.getItem('cacheUserData') || '{}');
  // export interface IState {
  //   id?: number;
  //   agentId: string;
  //   uid: string;
  //   name: string;
  //   brandName: string;
  //   phone: string;
  //   companyId: string;
  //   companyName: string;
  //   isAdmin: boolean;
  //   permissions: Record<string, boolean>;
  //   isSwitchable: boolean;
  //   companyLogo: string;
  //   city: string[];
  //   // roles: RoleType[];
  //   // tenantList: TenantType[];
  //   comment_active_interval: number;
  //   comment_active_codes: string[];
  //   isHxz: boolean;
  // }
  
  export default {
    namespace: 'user',
    state: {
      id: undefined,
    },
    effects: {
      // 获取用户信息
      * getUser({ },) {
        
       console.log('getUser')
      },
    },
    reducers: {
      // updateStore(state: any, { payload }: any) {
      //   return { ...state, ...payload };
      // },
    },
    subscriptions: {},
  };
  