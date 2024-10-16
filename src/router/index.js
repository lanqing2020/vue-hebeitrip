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
      // 允许通过路由的 params 接收参数
      // props: true,
      // meta: {
      // 只允许接收name参数
      //   acceptedQueryParams: ['name']
      // }
    },
    {
      path: '/location',
      name: 'location',
      component: () => import('@/views/location/Location.vue')
    },
    {
      // 路由中的参数分为两种：动态路由参数和查询参数
      // 动态路由参数 通过：符号标记参数 如下最终显示为 /location/center ，center将被传递给接收组件的props中
      // 2.查询参数：
      // path: "/abc",
      // name: "abc",
      // component: Abc,
      // props: (route) => ({
      //   id: route.query.id
      // })
      // 这里使用props的函数表达式来定义查询参数，用户访问/user?id=99时，99将被传递给目标组件的props中
      path: '/location/:name',
      name: 'location-list',
      component: () => import('@/views/location/LocationList.vue'),
      meta: {
        // 只允许接收name参数
        acceptedQueryParams: ['name']
      }
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

  // 当路径正确，查询参数不合法时
  // 如果存在未指定的query参数，则拦截并跳转到一个错误页面或其他页面
  if (invalidQueryParams.length > 0) {
    showDialog({
      title: '错误',
      message: `不合法的查询参数，${invalidQueryParams.join(', ')}` ,
    }).then(() => {
      console.log("点击了确定按钮")
      next(to.path)
    });
  }

  // 当路径输入不正确时
  if (router.getRoutes().every(item => {
    // 目的地列表使用了动态路由参数，需要在这里放开
    if (to.path === "/location/center" || to.path === "/location/north" || to.path === "/location/south" || to.path === "/location/east") {
      next();
    }
    return item.path.indexOf(to.path) === -1
  } )) {
    next('/error')
  }

  // 正常导航
  next();
});

export default router
