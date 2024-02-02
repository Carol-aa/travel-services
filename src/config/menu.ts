// hideInMenu: 路由在左侧菜单是否显示
// permission: 菜单对应权限点名称。(用来控制菜单是否禁用)
// isIframe: 是否是外嵌系统。（如果是，需要隐藏页面标题）
// hasGoBack: 是否有返回按钮 （如果有，需要在页面标题加返回功能）
// level: 面包屑层级
// grayRelease: 灰度商户(Apollo配置标识)
// mainFetchKey: 当前路由的关键接口




const pathWorkOrder = 'https://kefu-portal.honghusaas.com';

// export interface Menu {
//   name?: string
//   path?: string
//   icon?: string
//   isPage?: boolean
//   hideInHxz?: boolean // 花小猪自营商户隐藏菜单
//   hideInMenu?: boolean // 路由在左侧菜单是否显示
//   isIframe?: boolean // 是否是外嵌系统。（如果是，需要隐藏页面标题）
//   level?: number // 面包屑层级
//   mainFetchKey?: string // 当前路由的关键接口
//   permission?: string // 菜单对应权限点名称。(用来控制菜单是否禁用)
//   grayRelease?: string // 灰度商户(Apollo配置标识)
//   hasGoBack?: boolean // 是否有返回按钮 （如果有，需要在页面标题加返回功能）
//   target?: string // 直接跳转
//   children?: Menu[]
// }

const menu = [
  {
    name: '首页',
    path: '/',
    icon: 'new_home',
    hideInMenu: true,
    isPage: true,
    isIframe: true,
    level: 0,
    mainFetchKey: 'home',
    // permission: 'kefu./homepage',
  },
  {
    name: '账号权限管理',
    icon: 'account_management',
    path: 'account-management',
    permission: 'kefu.account-management',
    children: [
      {
        name: '账号管理',
        path: 'add-search',
        hideInMenu: true,
        permission: 'kefu.account-management/add-search',
        isPage: true,
        level: 2,
        mainFetchKey: 'accountManagement'
      },
      {
        name: '角色管理',
        path: 'role',
        hideInMenu: true,
        permission: 'kefu.account-management/role',
        isPage: true,
        level: 2
      },
      {
        name: '批量新增/删除城市权限',
        path: 'batch-cities',
        hideInMenu: true,
        permission: 'kefu.account-management/batch-cities',
        isPage: true,
        level: 2
      }
    ]
  },
  {
    name: '经营诊断',
    icon: 'manage_diagnosis',
    path: 'manage-diagnosis',
    permission: 'kefu.manage-diagnosis',
    children: [
      {
        name: '诊断总览',
        path: 'diagnosis-overview',
        permission: 'kefu.manage-diagnosis/diagnosis-overview',
        isPage: true,
        level: 2,
        mainFetchKey: 'diagnosisOverview'
      },
      {
        name: '交易漏斗分析',
        path: 'transaction-funnel',
        isPage: true,
        permission: 'kefu.manage-diagnosis/transactionFunnel',
        children: [
          {
            name: '匹配率分析',
            path: 'matching-ratio',
            permission: 'kefu.manage-diagnosis/transactionFunnel',
            isPage: true,
            level: 2
          },
          {
            name: '应答率分析',
            path: 'response-ratio',
            permission: 'kefu.manage-diagnosis/transactionFunnel',
            isPage: true,
            level: 2
          },
          {
            name: '履约率分析',
            path: 'appointment-ratio',
            permission: 'kefu.manage-diagnosis/transactionFunnel',
            isPage: true,
            level: 2
          }
        ]
      },
    ]
  },
  {
    name: '配置中心',
    icon: 'configuration_center',
    path: 'configuration-center',
    permission: 'kefu.configuration-center',
    children: [
      {
        name: '计价配置中心',
        path: 'price-center',
        permission: 'kefu.configuration-center/price-center',
        level: 2,
        children: [
          {
            name: '智能调价',
            path: 'smart-price',
            permission: 'kefu.configuration-center/smart-price/view',
            isPage: true,
            level: 2,
            grayRelease: 'smart_price'
          },
          {
            name: '价格调整',
            path: 'smart-price-adjust',
            hideInMenu: true,
            isPage: true,
            hasGoBack: true,
            level: 3,
            permission: 'kefu.configuration-center/smart-price/adjust'
          },
          {
            name: '调价公示配置',
            path: 'smart-price-public',
            isPage: true,
            hasGoBack: true,
            level: 3,
            permission: 'kefu.configuration-center/smart-price/view',
            grayRelease: 'smart_price'
          },
          {
            name: '基础定价',
            path: 'city-price',
            permission: 'kefu.configuration-center/city-price',
            isPage: true,
            level: 2,
            mainFetchKey: 'cityPrice'
          },
          {
            name: '收益看板',
            path: 'income-show',
            permission: 'kefu.configuration-center/income-show',
            isPage: true,
            level: 2,
            grayRelease: 'smart_price'
          },
          {
            name: '流量助手',
            path: 'adjust-price',
            hideInMenu: true,
            isPage: true,
            hasGoBack: true,
            level: 3
          },
          {
            name: '定价诊断',
            path: 'price-diagnosis',
            hideInMenu: true,
            isPage: true,
            hasGoBack: true,
            level: 3,
            permission: 'kefu.configuration-center/recommend-config'
          },
          {
            name: '节假日服务费',
            path: 'festival-price',
            permission: 'kefu.configuration-center/spring-festival-price',
            isPage: true,
            level: 2,

          },
          {
            name: '综合能耗费',
            path: 'energy-fee',
            permission: 'kefu.configuration-center/energy-fee',
            isPage: true,
            level: 2,
            grayRelease: 'priceCenter_energyFee'
          }
        ]
      },
      {
        name: '分佣规则配置',
        path: 'commission-config',
        permission: 'kefu./configuration-center/commission-config',
        isPage: true,
        level: 2
      },
      {
        name: '提现规则管理',
        path: 'cash-out',
        permission: 'kefu./configuration-center/commission-config',
        isPage: true,
        level: 2
      },
      {
        name: '城市规则配置',
        path: 'rules-config',
        permission: 'kefu.configuration-center/city-rules/menu',
        level: 2,
        children: [
          {
            name: '客服配置',
            path: 'city-rules',
            permission: 'kefu.configuration-center/city-rules',
            isPage: true,
            level: 2
          },
          {
            name: '出车拦截配置',
            path: 'conformance-rules',
            permission: 'kefu.configuration-center/city-rules/conformance',
            isPage: true,
            level: 2
          },
          {
            name: '提现管控规则',
            path: 'cash-rules',
            permission: 'kefu.configuration-center/city-rules/cash-rules',
            isPage: true,
            level: 2
          }
        ]
      },
      {
        name: 'B端开城配置',
        path: 'business-open-city',
        permission: 'kefu.configuration-center/business-open-city',
        isPage: true,
        level: 2
      },
      {
        name: '资源位配置',
        path: 'push-config',
        permission: 'kefu.configuration-center/push-config',
        isPage: true,
        level: 2
      },
      {
        name: '资源位配置',
        path: 'push-form',
        permission: 'kefu.configuration-center/push-config',
        isPage: true,
        hideInMenu: true,
        hasGoBack: true,
        level: 3
      },
      {
        name: '品类联盟配置',
        path: 'long-price-menu',
        permission: 'kefu.configuration-center/long-price',
        level: 2,
        children: [
          {
            name: '品类联盟开通',
            path: 'long-price',
            permission: 'kefu.configuration-center/long-price',
            isPage: true,
            level: 2
          },
          {
            name: '品类联盟数据',
            path: 'long-price-data-board',
            permission: 'kefu.configuration-center/long-price/data-board',
            isPage: true,
            level: 2
          },
          {
            name: '品类联盟介绍',
            path: 'box-detail',
            permission: 'kefu.configuration-center/long-price',
            isPage: true,
            level: 2,
            hideInMenu: true
          }
        ]
      },
      {
        name: '交易规则',
        path: 'transaction-rules',
        isPage: true,
        permission: 'kefu.configuration-center/push-config',
        children: [
          {
            name: '抢单大厅',
            path: 'take-orders-box',
            permission: 'kefu.configuration-center/push-config',
            isPage: true,
            level: 2
          }
        ]
      },
      {
        name: '空驶补偿',
        path: 'empty-subsidy',
        isPage: true,
        level: 2,
        permission: 'kefu.configuration-center/empty-subsidy',
        grayRelease: 'empty_subsidy'
      },
      {
        name: '派单规则',
        path: 'dispatch-order-rule',
        permission: 'kefu./configuration-center/dispatch-order-rule',
        isPage: true,
        level: 2,
        grayRelease: 'dispatch_order'
      },
      {
        name: '规则内容',
        path: 'dispatch-order-rule-content',
        permission: 'kefu./configuration-center/dispatch-order-rule',
        isPage: true,
        level: 2,
        hideInMenu: true,
        grayRelease: 'dispatch_order'
      },
      {
        name: '规则详情',
        path: 'dispatch-order-rule-detail',
        permission: 'kefu./configuration-center/dispatch-order-rule',
        isPage: true,
        level: 2,
        hideInMenu: true,
        grayRelease: 'dispatch_order'
      },
    ]
  },
  {
    name: '自营管理',
    icon: 'private_management',
    path: 'private-organization',
    permission: 'kefu.private-organization',
    children: [
      {
        name: '自营车队管理',
        path: 'private-ori-manage',
        permission: 'kefu.private-organization/private-ori-manage',
        isPage: true,
        level: 2
      },
      {
        name: '自营车队查看',
        path: 'private-ori-view',
        permission: 'kefu.private-organization/private-ori-view',
        isPage: true,
        hideInMenu: true,
        hasGoBack: true,
        level: 3
      }
    ]
  },
  {
    name: '资产管理',
    icon: 'asset_management',
    path: 'asset-management',
    permission: 'kefu.asset-management',
    children: [
      {
        name: '运力公司管理',
        path: 'company-management',
        permission: 'kefu.asset-management/company-management',
        children: [
          {
            name: '代理商管理',
            path: 'agent-manage',
            permission: 'kefu.asset-management/company-management/agent-manage',
            isPage: true,
            level: 2,
            mainFetchKey: 'agentManage'
          },
          {
            name: '分佣规则',
            path: 'agent-rule-form',
            permission: 'kefu.asset-management/company-management/agent-manage/commission-config',
            isPage: true,
            hideInMenu: true,
            hasGoBack: true,
            level: 3
          },
          {
            name: '提现&扣款规则',
            path: 'account-rule',
            permission: 'kefu.asset-management/company-management/agent-manage/commission-config',
            isPage: true,
            hideInMenu: true,
            hasGoBack: true,
            level: 3
          },
          {
            name: '门店信息',
            path: 'shop-info',
            permission: 'kefu.asset-management/company-management/agent-manage/shop',
            isPage: true,
            hideInMenu: true,
            hasGoBack: true,
            level: 3
          },
          {
            name: '供应商管理',
            path: 'supplier-manage',
            permission: 'kefu.asset-management/company-management/supplier-manage',
            isPage: true,
            level: 2
          },
          {
            name: '渠道数据看板',
            path: 'manage-data-board',
            permission: 'kefu.asset-management/company-management/data-check',
            isPage: true,
            level: 2,
            mainFetchKey: 'manageDataBoard'
          },
          {
            name: '渠道任务下发',
            path: 'task-manage',
            permission: 'kefu.asset-management/company-management/task-manage',
            isPage: true,
            level: 2
          },
          {
            name: '渠道任务接收',
            path: 'my-task-manage',
            permission: 'kefu.asset-management/company-management/my-task-manage',
            isPage: true,
            level: 2
          },
          {
            name: '任务配置',
            path: 'task-config',
            permission: 'kefu.asset-management/company-management/task-manage',
            isPage: true,
            hideInMenu: true,
            hasGoBack: true,
            level: 2
          },
          {
            name: '任务详情',
            path: 'task-detail',
            permission: 'kefu.asset-management/company-management/task-detail',
            isPage: true,
            hideInMenu: true,
            hasGoBack: true,
            level: 2
          },
          {
            name: '分佣规则',
            path: 'agent-rule-form',
            permission: 'kefu.asset-management/company-management/agent-manage/commission-config',
            isPage: true,
            hideInMenu: true,
            hasGoBack: true,
            level: 3
          }
        ]
      },
      {
        name: '司机驿站',
        path: 'driver-stat',
        permission: 'kefu.asset-management/driver-stat',
        children: [
          {
            name: '驿站管理',
            path: 'manage',
            permission: 'kefu.asset-management/driver-stat/manage',
            isPage: true,
            level: 2
          },
          {
            name: '任务管理',
            path: 'task',
            permission: 'kefu.asset-management/driver-stat/task',
            isPage: true,
            level: 2,
          },
          {
            name: '任务详情',
            path: 'task-detail',
            permission: 'kefu.asset-management/driver-stat/task-detail',
            isPage: true,
            hideInMenu: true,
            hasGoBack: true,
            level: 3,
          },
          {
            name: '任务数据',
            path: 'task-data',
            permission: 'kefu.asset-management/driver-stat',
            isPage: true,
            level: 2,
          },
        ]
      },
      {
        name: '司机管理',
        path: 'driver-menu',
        permission: 'kefu.asset-management/driver-menu',
        children: [
          {
            name: '批量导入司机',
            path: 'batch-import-driver',
            permission: 'kefu.asset-management/batch-import-driver',
            isPage: true,
            isIframe: true,
            level: 2
          },
          {
            name: '未准入司机',
            path: 'leads',
            isPage: true,
            level: 2,
            grayRelease: 'driver_leads',
            permission: 'kefu.asset-management/driver-menu-leads',
          },
          {
            name: '准入中司机',
            path: 'admit-driver-list',
            permission: 'kefu.asset-management/admit-driver-list',
            isPage: true,
            isIframe: true,
            level: 2
          },
          {
            name: '准入通过司机',
            path: 'driver-manage',
            permission: 'kefu.asset-management/driver-manage',
            isPage: true,
            level: 2
          },
          {
            name: '全量司机查询',
            path: 'extensive-driver-list',
            permission: 'kefu.asset-management/driver-manage',
            isPage: true,
            level: 2,
            mainFetchKey: 'extensiveDriverList'
          },
          {
            name: '司机招募链接',
            path: 'recruitment-link',
            permission: 'kefu.asset-management/recruitment-link',
            isPage: true,
            level: 2,
            mainFetchKey: 'recruitmentLink'
          },
          {
            name: '游客模式链接',
            path: 'guest-link',
            permission: 'kefu.asset-management/guest-link',
            isPage: true,
            level: 3
          },
          {
            name: '游客模式编辑',
            path: 'guest-link-edit',
            permission: 'kefu.asset-management/guest-link-edit',
            isPage: true,
            level: 3,
            hideInMenu: true
          },
          {
            name: '线索详情页',
            path: 'leads-detail',
            hideInMenu: true,
            isPage: true,
            hasGoBack: true,
            level: 3,
            grayRelease: 'driver_leads',
          },
          {
            name: '司机信息查看',
            path: 'driver-detail',
            hideInMenu: true,
            isPage: true,
            hasGoBack: true,
            level: 3
          }
        ]
      },
      {
        name: '无车加盟司机',
        path: 'nocar',
        permission: 'kefu.asset-management/noCar-menu',
        grayRelease: 'no_car',
        children: [
          {
            name: '司机线索',
            path: 'driver-clue',
            permission: 'kefu.asset-management/noCar-clue',
            isPage: true,
            level: 2
          },
          {
            name: '加盟链接',
            path: 'join-list',
            permission: 'kefu.asset-management/noCar-join',
            isPage: true,
            level: 2
          }
        ]
      }
    ]
  },
]
export default menu;