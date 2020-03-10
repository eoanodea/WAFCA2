<template>
  <div>
    <Header/>
    <transition :name="transitionName">
      <router-view></router-view>
    </transition>
    <Footer/>
  </div>
</template>
<script>
  import Vue from 'vue'
  import Header from './components/layout/Header'
  import Footer from './components/layout/Footer'

  const DEFAULT_TRANSITION = 'fade';

  export default {
    name: 'app',
    components: {
      Header,
      Footer
    },
    data() {
      return {
        transitionName: DEFAULT_TRANSITION,
      }
    },
    /**
     * Watch Router for changes
     * On Update, check if to route index
     * if greater than from route index
     * if so, slide left, else slide right
     */
    watch: {
      '$route' (to, from, options) {
        const routes = this.$router.options.routes
        let toIndex
        let fromIndex

        routes.map((dat, i) => {
          if(dat.name === to.name) toIndex = i
          if(dat.name === from.name) fromIndex = i
        })

        this.transitionName = toIndex < fromIndex ? 'slide-right' : 'slide-left'
      }
    }
  }
</script>
<style lang="scss" scoped>
  .slide-left-enter-active,
  .slide-left-leave-active,
  .slide-right-enter-active,
  .slide-right-leave-active {
    transition-duration: 0.5s;
    transition-property: height, opacity, transform;
    transition-timing-function: cubic-bezier(0.55, 0, 0.1, 1);
    overflow: hidden;
  }
  .slide-left-enter,
  .slide-right-leave-active {
    opacity: 0;
    transform: translate(5em, 0);
  }

  .slide-left-leave-active,
  .slide-right-enter {
    opacity: 0;
    transform: translate(-5em, 0);
  }
</style>
