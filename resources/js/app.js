require('./bootstrap');
import Vue from 'vue'
import App from './App.vue'
import router from './router'

//Material UI minfied css and custom theme
import 'vue-material/dist/vue-material.min.css'
import './../sass/theme.scss'

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
