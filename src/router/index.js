import {createRouter, createWebHistory, useRouter} from 'vue-router'
import { showDialog } from 'vant';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'index',
      component: () => import('@/views/home/Home.vue'),
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
    },
    {
      path: '/city',
      name: 'city',
      component: () => import('@/views/city/City.vue')
    },
    {
      path: '/order',
      name: 'order',
      component: () => import('@/views/order/Order.vue')
    },
    {
      path: '/user',
      name: 'user',
      component: () => import('@/views/user/User.vue')
    },
    {
      path: '/user/set',
      name: 'user-set',
      component: () => import('@/views/user/UserSet.vue')
    },
    {
      path: '/user/account',
      name: 'user-account',
      component: () => import('@/views/user/UserAccount.vue')
    },
    {
      path: '/user/bind',
      name: 'user-bind',
      component: () => import('@/views/user/UserBind.vue')
    },
    {
      path: '/user/changePwd',
      name: 'user-changePwd',
      component: () => import('@/views/user/ChangePwd.vue')
    },
    {
      path: '/user/bindPhone',
      name: 'user-bindPhone',
      component: () => import('@/views/user/BindPhone.vue')
    },
    {
      path: '/user/certificate',
      name: 'user-certificate',
      component: () => import('@/views/user/Certificate.vue')
    },
    {
      path: '/user/help',
      name: 'user-help',
      component: () => import('@/views/user/UserHelp.vue')
    },
    {
      path: '/detail',
      name: 'detail',
      component: () => import('@/views/detail/Detail.vue'),
      meta: {
        acceptedQueryParams: ['productId']
      }
    },
    {
      path: '/detail/result',
      name: 'detail-result',
      component: () => import('@/views/detail/DetailResult.vue'),
      meta: {
        acceptedQueryParams: ['type']
      }
    },
    {
      path: '/error',
      name: 'error',
      component: () => import('@/views/error/Error.vue')
    },
  ]
})

// 在路由守卫中检查query参数
router.beforeEach((to, from, next) => {
  const acceptedQueryParams = to.meta.acceptedQueryParams || [];
  const queryParams = Object.keys(to.query);
  const invalidQueryParams = queryParams.filter(param => !acceptedQueryParams.includes(param));

  // 如果存在未指定的query参数，则拦截并跳转到一个错误页面或其他页面
  if (invalidQueryParams.length > 0) {
    showDialog({
      title: '错误',
      message: `不合法的查询参数，${invalidQueryParams.join(', ')}` ,
    }).then(() => {
      next(to.path)
    });
  }
  if (router.getRoutes().every(item => item.path.indexOf(to.path) === -1)) {
    next('/error')
  }
  next(); // 正常导航
});

export default router
