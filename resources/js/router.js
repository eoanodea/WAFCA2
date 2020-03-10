import Vue from 'vue'
import Router from 'vue-router'
import store from './store/index'

import Home from './views/Home'
import Example from './views/Example'
import Signin from './views/auth/Signin'
import User from './views/auth/User'

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
      name: 'home',
      component: Home,
      icon: "home",
      display: 'top'
    },
    {
      path: '/signin',
      name: 'sign_in',
      component: Signin,
      icon: "input",
    },
    {
      path: '/profile',
      name: 'profile',
      component: User,
      icon: "account_circle",
      display: 'top'
    },
    {
      path: '/course',
      name: 'courses',
      component: Example,
      icon: "menu_book",
      display: 'top',
      beforeEnter: (to, from, next) => beforeEnter(to, from, next)
    },
  ]
})
