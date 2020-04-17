
const routes = [
  {
    path: '/',
    component: '../layouts/BasicLayout',
    authority: ['admin', 'user'],
    routes: [
      {
        path: '/',
        redirect: '/welcome',
      },
      {
        path: '/welcome',
        name: 'welcome',
        icon: 'smile',
        component: './Welcome',
      },
      {
        name: 'pay-order',
        icon: 'table',
        routes: [
          {
            name: '内部账号',
            icon: 'table',
            path: '/web/pay/inside-account',
            component: './Pay/InnerAccout',
          },
          {
            path: '/web/pay/inside-recharge',
            name: '内部充值',
            icon: 'smile',
            component: './pay/InnerCharage'
          },
        ]
      },
      {
        component: './404',
      },
    ],
  },
  {
    component: './404',
  },
]

export default routes
