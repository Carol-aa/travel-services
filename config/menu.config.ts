export default [
  {
    title: '计价配置',
    link: '/pricing',
    key: 'pricing',
    icon: '',
    children: [],
  },
  {
    title: '司机管理',
    link: '/list',
    key: 'list',
    icon: '',
    children: [
      {
        title: '全量司机查询',
        link: '/list/queryTable',
        key: 'queryTable',
        icon: '',
        children: [],
      },
      {
        title: '司机准入',
        link: '/list/access',
        key: 'access',
        icon: '',
        children: [],
      },
    ],
  },
  {
    title: '司机运营',
    link: '/func',
    key: 'func',
    icon: '',
    children: [
      {
        title: '定价管理',
        link: '/func/draggable',
        key: 'draggable',
        icon: '',
        children: [],
      },
      {
        title: 'gg-editor',
        link: '/func/ggEditor',
        key: 'ggEditor',
        icon: '',
        children: [],
      },
      {
        title: 'antvX6',
        link: '/func/antvX6',
        key: 'antvX6',
        icon: '',
        children: [],
      },
    ],
  },
  {
    title: '订单管理',
    link: '/order',
    key: 'order',
    icon: '',
    children: [
      {
        title: '订单查询',
        link: '/order/orderTable',
        key: 'orderTable',
        icon: '',
        children: [],
      },
      {
        title: '订单数据',
        link: '/order/data',
        key: 'orderData',
        icon: '',
        children: [],
        asdefault: false,
      },
    ],
  },
];
