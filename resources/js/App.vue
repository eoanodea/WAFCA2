<template>
  <div>
    <Header/>
    <router-view></router-view>
    <Footer/>
  </div>
</template>
<script>
  import Vue from 'vue'
  import { MdApp } from 'vue-material/dist/components'
  import Header from './components/layout/Header'
  import Footer from './components/layout/Footer'

  Vue.use(MdApp)

  export default {
    name: 'app',
    components: {
      Header,
      Footer
    },
    data() {
      return {

      }
    }
  }
</script>
<style>
</style>
