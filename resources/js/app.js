require('./bootstrap');
import Vue from 'vue'
import App from './App.vue'
import router from './router'

//VueX Store
import store from './store/index'
require('./store/subscriber')

//Material UI minfied css and custom theme
import 'vue-material/dist/vue-material.min.css'
import './../sass/theme.scss'

const token = localStorage.getItem('access_token')

if(token !== null) {
  window.axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
}


store.dispatch('auth/attemptToken', token).then(() => {
  new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount('#app')
})