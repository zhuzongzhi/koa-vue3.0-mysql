import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

export const constantRouterMap = [
    { path: '/login', component: () => import('@/views/login/index'), hidden: true },
    { path: '/404', component: () => import('@/views/404'), hidden: true },

    /*课程*/
    {
      path: '/',
      name: 'CourseList',
      component: () => import('@/views/course/list'),
      meta: {title: '课程', icon: ''},
      hidden: true
    },
    {
      path: '/courseDetail',
      component: () => import('@/views/course/detail'),
      name: 'CourseDetail',
      meta: { title: '课程详情', icon: 'icon-fenleiorguangchangorqitatianchong' },
      hidden: true
    },

    { path: '*', redirect: '/404', hidden: true }
];
export default new Router({
    mode: "history",
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRouterMap
});
