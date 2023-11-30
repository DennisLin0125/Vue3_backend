export const constantRouter = [
  {
    name: 'Login',
    path: '/login',
    component: () => import('@/views/login/index.vue'),
    meta: {
      title: '登入',
      hidden: true,
      icon: 'Promotion',
    },
  },
  {
    name: 'Layout',
    path: '/',
    component: () => import('@/layout/index.vue'),
    redirect: '/home',
    meta: {
      title: 'layout',
      icon: 'Avatar',
    },
    children: [
      {
        path: '/home',
        component: () => import('@/views/home/index.vue'),
        meta: {
          title: '首頁',
          icon: 'HomeFilled',
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
      icon: 'CircleClose',
    },
  },
  {
    path: '/screen',
    name: 'Screen',
    component: () => import('@/views/screen/index.vue'),
    meta: {
      title: '大數據',
      icon: 'Platform',
    },
  },
  {
    path: '/acl',
    name: 'Acl',
    component: () => import('@/layout/index.vue'),
    meta: {
      title: '權限管理',
      icon: 'Lock',
    },
    children: [
      {
        path: '/acl/user',
        component: () => import('@/views/acl/user/index.vue'),
        meta: {
          name: 'Acl',
          title: '用戶管理',
          icon: 'User',
        },
      },
      {
        path: '/acl/role',
        component: () => import('@/views/acl/role/index.vue'),
        meta: {
          name: 'Role',
          title: '角色管理',
          icon: 'UserFilled',
        },
      },
      {
        path: '/acl/permission',
        component: () => import('@/views/acl/permission/index.vue'),
        meta: {
          name: 'Permission',
          title: '菜單管理',
          icon: 'Grid',
        },
      },
    ],
  },
  {
    path: '/product',
    name: 'Product',
    component: () => import('@/layout/index.vue'),
    meta: {
      title: '商品管理',
      icon: 'Goods',
    },
    children: [
      {
        path: '/product/trademark',
        component: () => import('@/views/product/trademark/index.vue'),
        name: 'Trademark',
        meta: {
          title: '品牌管理',
          icon: 'ShoppingCartFull',
        },
      },
      {
        path: '/product/attr',
        component: () => import('@/views/product/attr/index.vue'),
        name: 'Attr',
        meta: {
          title: '平台屬性管理',
          icon: 'Sunny',
        },
      },
      {
        path: '/product/spu',
        component: () => import('@/views/product/spu/index.vue'),
        name: 'Spu',
        meta: {
          title: 'SPU管理',
          icon: 'Calendar',
        },
      },
      {
        path: '/product/sku',
        component: () => import('@/views/product/sku/index.vue'),
        name: 'Sku',
        meta: {
          title: 'SKU管理',
          icon: 'Apple',
        },
      },
    ],
  },
  {
    name: 'Any',
    path: '/:pathMatch(.*)*',
    redirect: '/404',
    meta: {
      title: '任意路由',
      hidden: true,
      icon: 'Refresh',
    },
  },
]
