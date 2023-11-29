export const constantRouter = [
  {
    name: 'login',
    path: '/login',
    component: () => import('@/views/login/index.vue'),
    meta: {
      title: '登入',
      hidden: true,
    },
  },
  {
    name: 'layout',
    path: '/',
    component: () => import('@/layout/index.vue'),
    meta: {
      title: 'layout',
      hidden: false,
    },
    children: [
      {
        path: '/home',
        component: () => import('@/views/home/index.vue'),
        meta: {
          title: '首頁',
          hidden: true,
        },
      },
      {
        path: '/test',
        component: () => import('@/views/home/index.vue'),
        meta: {
          title: '測試',
          hidden: false,
        },
      },
    ],
  },
  {
    name: '404',
    path: '/404',
    component: () => import('@/views/404/index.vue'),
    meta: {
      title: '404',
      hidden: true,
    },
  },
  {
    name: 'Any',
    path: '/:pathMatch(.*)*',
    redirect: '/404',
    meta: {
      title: '任意路由',
      hidden: true,
    },
  },
]
