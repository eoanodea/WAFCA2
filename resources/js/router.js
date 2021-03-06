import Vue from 'vue'
import Router from 'vue-router'
import store from './store/index'

import Home from './views/Home'
import Dashboard from './views/Dashboard'

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

/**
 * Enrolment Routes
 */
import EnrolmentIndex from './views/enrolments/Index'
import EnrolmentShow from './views/enrolments/Show'
import EnrolmentCreate from './views/enrolments/Create'
import EnrolmentEdit from './views/enrolments/Edit'


/**
 * Auth Routes
 */
import Signin from './views/auth/Signin'
import Signup from './views/auth/Signup'
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

/**
 * Redirect users who are logged in from unauthed pages
 * 
 * -Home
 * -Signin
 * -Signup
 */
function redirectAuthedUser(to, from, next) {
  if(store.getters['auth/authenticated']) {
    return next({
      name: 'dashboard'
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
      beforeEnter: (to, from, next) => redirectAuthedUser(to, from, next),
      meta: {
        theme: 'teal',
        notAuthed: true        
      }
    },
    {
      path: '/signin',
      name: 'signin',
      component: Signin,
      icon: "input",
      beforeEnter: (to, from, next) => redirectAuthedUser(to, from, next),
      meta: {
        theme: 'blue',
        notAuthed: true      
      }
    },
    {
      path: '/signup',
      name: 'signup',
      component: Signup,
      icon: "contacts",
      beforeEnter: (to, from, next) => redirectAuthedUser(to, from, next),
      meta: {
        theme: 'red',
        notAuthed: true     
      }
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard,
      icon: "dashboard",
      display: 'top',
      beforeEnter: (to, from, next) => beforeEnter(to, from, next),
      meta: {
        theme: 'teal'        
      }
    },
    {
      path: '/course',
      name: 'courses',
      component: CourseIndex,
      icon: "menu_book",
      display: 'top',
      beforeEnter: (to, from, next) => beforeEnter(to, from, next),
      meta: {
        theme: 'orange'        
      }
    },
    {
      path: '/course/show/:id',
      name: 'course',
      component: CourseShow,
      icon: "menu_book",
      beforeEnter: (to, from, next) => beforeEnter(to, from, next),
      meta: {
        theme: 'orange'        
      }
    },
    {
      path: '/course/new',
      name: 'courseCreate',
      component: CourseCreate,
      icon: "menu_book",
      beforeEnter: (to, from, next) => beforeEnter(to, from, next),
      meta: {
        theme: 'orange'        
      }
    },
    {
      path: '/course/edit/:id',
      name: 'courseEdit',
      component: CourseEdit,
      icon: "menu_book",
      beforeEnter: (to, from, next) => beforeEnter(to, from, next),
      meta: {
        theme: 'orange'        
      }
    },
    {
      path: '/lecturer',
      name: 'lecturers',
      component: LecturerIndex,
      icon: "supervised_user_circle",
      display: 'top',
      beforeEnter: (to, from, next) => beforeEnter(to, from, next),
      meta: {
        theme: 'blue'        
      }
    },
    {
      path: '/lecturer/show/:id',
      name: 'lecturer',
      component: LecturerShow,
      icon: "supervised_user_circle",
      beforeEnter: (to, from, next) => beforeEnter(to, from, next),
      meta: {
        theme: 'blue'        
      }
    },
    {
      path: '/lecturer/new',
      name: 'lecturerCreate',
      component: LecturerCreate,
      icon: "supervised_user_circle",
      beforeEnter: (to, from, next) => beforeEnter(to, from, next),
      meta: {
        theme: 'blue'        
      }
    },
    {
      path: '/lecturer/edit/:id',
      name: 'lecturerEdit',
      component: LecturerEdit,
      icon: "supervised_user_circle",
      beforeEnter: (to, from, next) => beforeEnter(to, from, next),
      meta: {
        theme: 'blue'        
      }
    },
    {
      path: '/enrolment',
      name: 'enrolments',
      component: EnrolmentIndex,
      icon: "assignment_ind",
      display: 'top',
      beforeEnter: (to, from, next) => beforeEnter(to, from, next),
      meta: {
        theme: 'red'        
      }
    },
    {
      path: '/enrolment/show/:id',
      name: 'enrolment',
      component: EnrolmentShow,
      icon: "assignment_ind",
      beforeEnter: (to, from, next) => beforeEnter(to, from, next),
      meta: {
        theme: 'red'        
      }
    },
    {
      path: '/enrolment/new',
      name: 'enrolmentCreate',
      component: EnrolmentCreate,
      icon: "assignment_ind",
      beforeEnter: (to, from, next) => beforeEnter(to, from, next),
      meta: {
        theme: 'red'        
      }
    },
    {
      path: '/enrolment/edit/:id',
      name: 'enrolmentEdit',
      component: EnrolmentEdit,
      icon: "assignment_ind",
      beforeEnter: (to, from, next) => beforeEnter(to, from, next),
      meta: {
        theme: 'red'        
      }
    },
    {
      path: '/profile',
      name: 'profile',
      component: User,
      icon: "account_circle",
      display: 'top',
      beforeEnter: (to, from, next) => beforeEnter(to, from, next),
      meta: {
        theme: 'teal'        
      }
    },
  ]
})
