import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Temp from './views/Temp.vue'
import Login from './views/Login.vue'
import Layout from './views/Layout.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/',
      name: 'layout',
      component: Layout,
      children: [
        {
          path: '/temp',
          name: 'temp',
          component: Temp
        },
        {
          path: '/home',
          name: 'home',
          component: Home
        }
      ]
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: function () {
        return import(/* webpackChunkName: "about" */ './views/About.vue')
      }
    }
  ]
})
