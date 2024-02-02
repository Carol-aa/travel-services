// @ts-nocheck
import { lazy } from 'react';
// import PageTimeHOC from '@/utils/pagetime/PageTimeHOC';
// import HomeOrigin from '@/pages/home';

// const lazyResult = (lazyImport: () => Promise<any>) => lazy(() => {
//   window.currentPageTiming.registerTiming('lazy');
//   return lazyImport().then(res => {
//     return {
//       default: PageTimeHOC(res.default)
//     };
//   });
// });

// const Home = PageTimeHOC(HomeOrigin);

// const Welcome = import(/* webpackChunkName: 'welcome' */ '@/pages/welcome');
import welcome from '@/pages/welcome';
const routes = [
//   {
//     path: '/',
//     component: Home,
//     exact: true
//   },
  {
    path: '/welcome',
    component: welcome,
    exact: true
  },
 
];

export default routes;
