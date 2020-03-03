require('./bootstrap');
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'

//Material UI minfied css and custom theme
import 'vue-material/dist/vue-material.min.css'
import './../sass/theme.scss'

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
