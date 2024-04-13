import {createRouter, createWebHistory, useRouter} from 'vue-router'
import { showDialog } from 'vant';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/index',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
    },
    {
      path: '/index',
      name: 'index',
      component: () => import('@/views/home/Home.vue'),
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
      path: '/login',
      name: 'login',
      component: () => import('@/views/login/Login.vue'),
      meta: {
        acceptedQueryParams: ['errorTimes']
      }
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('@/views/register/Register.vue'),
      meta: {
        acceptedQueryParams: ['errorTimes']
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
