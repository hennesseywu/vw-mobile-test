import Vue from 'vue';
import Router from 'vue-router';


const Index = () =>
  import('@/pages/index/index')

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [{
    path: '/',
    name: 'index',
    component: Index,
  }]
})
router.beforeEach((to, from, next) => {
  next()
})

export default router