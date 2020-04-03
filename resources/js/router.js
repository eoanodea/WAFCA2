import Vue from 'vue'
import Router from 'vue-router'
import store from './store/index'

import Home from './views/Home'
/**
 * Course Routes
 */
import CourseIndex from './views/courses/Index'
import CourseShow from './views/courses/Show'
import CourseCreate from './views/courses/Create'
import CourseEdit from './views/courses/Edit'

/**
 * Lecturer Routes
 */
import LecturerIndex from './views/lecturers/Index'
import LecturerShow from './views/lecturers/Show'
import LecturerCreate from './views/lecturers/Create'
import LecturerEdit from './views/lecturers/Edit'

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
      name: 'signin',
      component: Signin,
      icon: "input",
    },
    {
      path: '/profile',
      name: 'profile',
      component: User,
      icon: "account_circle",
      display: 'top',
      beforeEnter: (to, from, next) => beforeEnter(to, from, next)
    },
    {
      path: '/course',
      name: 'courses',
      component: CourseIndex,
      icon: "menu_book",
      display: 'top',
      beforeEnter: (to, from, next) => beforeEnter(to, from, next)
    },
    {
      path: '/course/show/:id',
      name: 'course',
      component: CourseShow,
      icon: "menu_book",
      beforeEnter: (to, from, next) => beforeEnter(to, from, next)
    },
    {
      path: '/course/new',
      name: 'courseCreate',
      component: CourseCreate,
      icon: "menu_book",
      beforeEnter: (to, from, next) => beforeEnter(to, from, next)
    },
    {
      path: '/course/edit/:id',
      name: 'courseEdit',
      component: CourseEdit,
      icon: "menu_book",
      beforeEnter: (to, from, next) => beforeEnter(to, from, next)
    },
    {
      path: '/lecturer',
      name: 'lecturers',
      component: LecturerIndex,
      icon: "supervised_user_circle",
      display: 'top',
      beforeEnter: (to, from, next) => beforeEnter(to, from, next)
    },
    {
      path: '/lecturer/show/:id',
      name: 'lecturer',
      component: LecturerShow,
      icon: "supervised_user_circle",
      beforeEnter: (to, from, next) => beforeEnter(to, from, next)
    },
    {
      path: '/lecturer/new',
      name: 'lecturerCreate',
      component: LecturerCreate,
      icon: "supervised_user_circle",
      beforeEnter: (to, from, next) => beforeEnter(to, from, next)
    },
    {
      path: '/lecturer/edit/:id',
      name: 'lecturerEdit',
      component: LecturerEdit,
      icon: "supervised_user_circle",
      beforeEnter: (to, from, next) => beforeEnter(to, from, next)
    },
  ]
})
