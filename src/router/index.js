import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/test',
    name: 'Test',

    component: () => import('../views/Test.vue')
  },
  {
    path: '/cube',
    name: 'Cube',

    component: () => import('../views/Cube.vue')
  },
  {
    path: '/mytool',
    name: 'Mytool',

    component: () => import('../views/Mytool.vue')
  },
  {
    path: '/croperTest',
    name: 'CroperTest',

    component: () => import('../views/croperTest.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
