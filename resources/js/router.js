import Vue from 'vue'
import Router from 'vue-router'
import store from './store/index'

import Index from './views/Index'
import Example from './views/Example'
import Signin from './views/auth/Signin'

Vue.use(Router)

/*
 * Checks if the user is authenticated in the store
 * if not redirect to signin
 */
function beforeEnter(to, from, next) {
  if(!store.getters['auth/authenticated']) {
      return next({
          name: 'signin'
      })
  }
  next()
}

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index
    },
    {
      path: '/signin',
      name: 'signin',
      component: Signin
    },
    {
      path: '/example',
      name: 'example',
      component: Example,
      beforeEnter: (to, from, next) => beforeEnter(to, from, next)
    }
  ]
})
