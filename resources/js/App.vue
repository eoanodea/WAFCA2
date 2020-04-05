<template>
  <md-content
    class="app-container"
  >
    <Header
      :theme="theme"
    />
    <md-content
      :md-theme="'elevation-' + theme"
      class="md-accent router-container md-layout md-gutter md-alignment-center-space-around"
      >
      <transition :name="transitionName" mode="out-in">
        <router-view></router-view>
      </transition>
    </md-content>
    <Footer
      :theme="theme"
    />
  </md-content>
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
        theme: 'teal'
      }
    },
    /**
     * Get the current theme from the current route meta data
     */
    mounted() {
      this.$material.theming.theme = 'bottom-bar-' + this.$router.currentRoute.meta.theme
      this.theme = this.$router.currentRoute.meta.theme      
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
        if(to.meta.theme) {
            console.log('theme!!', this.$material.theming.theme)
            this.$material.theming.theme = 'bottom-bar-' + to.meta.theme
            this.theme = to.meta.theme
          }
      }
    }
  }
</script>
<style lang="scss" scoped>
  .app-container {
    min-height: 100vh;
  }
  .router-container {
    margin: 40px auto 50px auto;
    display: flex;
    justify-content: center;
  }
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
