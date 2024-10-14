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
      path: '/location',
      name: 'location',
      component: () => import('@/views/location/Location.vue')
    },
    {
      path: '/location/detail',
      name: 'location-detail',
      component: () => import('@/views/location/LocationDetail.vue'),
      meta: {
        acceptedQueryParams: ['id']
      }
    },
    {
      path: '/location/more',
      name: 'location-more',
      component: () => import('@/views/location/LocationMore.vue'),
      meta: {
        acceptedQueryParams: ['id']
      }
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
      path: '/user/set-account',
      name: 'user-set-account',
      component: () => import('@/views/user/SetAccount.vue')
    },
    {
      path: '/user/set-bind',
      name: 'user-set-bind',
      component: () => import('@/views/user/SetBind.vue')
    },
    {
      path: '/user/bind-password',
      name: 'user-bind-password',
      component: () => import('@/views/user/BindPassword.vue')
    },
    {
      path: '/user/bind-phone',
      name: 'user-bind-phone',
      component: () => import('@/views/user/BindPhone.vue')
    },
    {
      path: '/user/tickets',
      name: 'user-tickets',
      component: () => import('@/views/user/UserTickets.vue')
    },
    {
      path: '/user/publish',
      name: 'user-publish',
      component: () => import('@/views/user/UserPublish.vue')
    },
    {
      path: '/user/publish-edit',
      name: 'user-publish-edit',
      component: () => import('@/views/user/PublishEdit.vue')
    },
    {
      path: '/user/collect',
      name: 'user-collect',
      component: () => import('@/views/user/UserCollect.vue')
    },
    {
      path: '/user/discount',
      name: 'user-discount',
      component: () => import('@/views/user/UserDiscount.vue')
    },
    {
      path: '/user/integral',
      name: 'user-integral',
      component: () => import('@/views/user/UserIntegral.vue')
    },
    {
      path: '/user/help',
      name: 'user-help',
      component: () => import('@/views/user/UserHelp.vue')
    },
    {
      path: '/user/protocol',
      name: 'user-protocol',
      component: () => import('@/views/user/HelpProtocol.vue')
    },
    {
      path: '/user/privacy',
      name: 'user-privacy',
      component: () => import('@/views/user/HelpPrivacy.vue')
    },
    {
      path: '/user/about',
      name: 'user-about',
      component: () => import('@/views/user/HelpAbout.vue')
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
