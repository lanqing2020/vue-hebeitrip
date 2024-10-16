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
      name: 'locationList',
      component: () => import('@/views/location/LocationList.vue'),
      // 该字段会被路由前置首页总函数截获，以进行逻辑处理
      meta: {
        requiresGuard: true
      }
    },
    {
      path: '/location/detail',
      name: 'locationDetail',
      component: () => import('@/views/location/LocationDetail.vue'),
      meta: {
        acceptedQueryParams: ['id']
      }
    },
    {
      path: '/location/more',
      name: 'locationMore',
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
      name: 'detailResult',
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
      name: 'userSet',
      component: () => import('@/views/user/UserSet.vue')
    },
    {
      path: '/user/set-account',
      name: 'user-SetAccount',
      component: () => import('@/views/user/SetAccount.vue')
    },
    {
      path: '/user/set-bind',
      name: 'userSetBind',
      component: () => import('@/views/user/SetBind.vue')
    },
    {
      path: '/user/bind-password',
      name: 'userBindPassword',
      component: () => import('@/views/user/BindPassword.vue')
    },
    {
      path: '/user/bind-phone',
      name: 'userBindPhone',
      component: () => import('@/views/user/BindPhone.vue')
    },
    {
      path: '/user/tickets',
      name: 'userTickets',
      component: () => import('@/views/user/UserTickets.vue')
    },
    {
      path: '/user/publish',
      name: 'userPublish',
      component: () => import('@/views/user/UserPublish.vue')
    },
    {
      path: '/user/publish-edit',
      name: 'userPublishEdit',
      component: () => import('@/views/user/PublishEdit.vue')
    },
    {
      path: '/user/collect',
      name: 'userCollect',
      component: () => import('@/views/user/UserCollect.vue')
    },
    {
      path: '/user/discount',
      name: 'userDiscount',
      component: () => import('@/views/user/UserDiscount.vue')
    },
    {
      path: '/user/integral',
      name: 'userIntegral',
      component: () => import('@/views/user/UserIntegral.vue')
    },
    {
      path: '/user/help',
      name: 'userHelp',
      component: () => import('@/views/user/UserHelp.vue')
    },
    {
      path: '/user/protocol',
      name: 'userProtocol',
      component: () => import('@/views/user/HelpProtocol.vue')
    },
    {
      path: '/user/privacy',
      name: 'userPrivacy',
      component: () => import('@/views/user/HelpPrivacy.vue')
    },
    {
      path: '/user/about',
      name: 'userAbout',
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

  // console.log("当前路径和参数===>", to.path, to.params)
  // 当查询参数不合法，没有对应的query参数时
  const errorQuery = invalidQueryParams.length > 0;
  // 当路径输入不正确时
  const errorPath = router.getRoutes().every(item => {
    const path = item.path;
    // 当输入 目的地 页的子路径时 进行判断
    if (to.meta && to.meta.requiresGuard) {
      const name = to.params.name;
      const accepts = ['center', 'north', 'south', 'east'];
      return accepts.every(item => item !== name);
    } else {
      return path.indexOf(to.path) === -1;
    }
  });
  if (errorQuery || errorPath) {
    showDialog({
      title: "错误",
      message: "不合法的查询参数或路径",
    }).then(r => {
      // 拦截并跳转到错误页面
      next("/error");
    });
    return;
  }
  next();
});

export default router
