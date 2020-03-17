/*
 * File: Footer.vue
 * Project: vue-portfolio
 * Version: 0.1.0
 * File Created: Tuesday, 11th February 2020 2:01:40 pm
 * Author: Eoan O'Dea - eoan@wspace.ie
 * ---------------
 * File Description: Application Footer
 * Last Modified: Tuesday, 11th February 2020 2:08:30 pm
 * Modified By: Eoan O'Dea - eoan@wspace.ie
 * ---------------
 * Copyright 2020 - WebSpace
 */



<template>
  <div class="bottom-bar-container">

      <md-bottom-bar 
        md-type="shift" 
        :md-theme="'bottom-bar-' + 'teal' "
    >

        <md-bottom-bar-item 
            v-for="(route, i) in renderRoutes()" 
            v-bind:key="`tab-${i}`" 
            :id="`tab-${route.name}`" 
            :md-label="route.name" 
            :to="route.path"
            @click="updateIndex"
            :md-icon="route.icon ? route.icon : null"
        />

      </md-bottom-bar>
  </div>
</template>

<script>
    import Vue from 'vue'
    import {MdBottomBar}  from 'vue-material/dist/components'
import { mapGetters } from 'vuex'

    Vue.use(MdBottomBar)

    export default {
        name: 'Footer',   
        data() {
            return {
                themeArr: ['teal', 'orange', 'blue', 'red'],
                routes: this.$router.options.routes,
            }
        },
        mounted() {
            this.renderRoutes()
        },
        methods: {
            renderRoutes() {
                let {routes, user} = this


                if(routes && routes.length > 0) {
                    let renderedRoutes = (user && user.name)
                    ? routes.filter(dat => dat.display === "top" && dat.name !== "signin")
                    : routes.filter(dat => !dat.beforeEnter)                    

                    return renderedRoutes
                }
            },
            // addThemeToRoutes(routes) {
            //     const {themeArr} = this
            //     console.log(routes,'routes')
            //     const result = routes.map((dat, i) => {
            //         return dat.theme = i > themeArr.length
            //         ? themeArr[Math.floor(Math.random() * themeArr.length)]
            //         : themeArr[i]
            //     })

            //     return result
            // }
        },
        computed: {
            ...mapGetters({
                user: 'auth/user'
            })
        },
}
</script>


<style lang="scss" scoped>
    .bottom-bar-container {
        position: fixed;
        bottom: 0;
        width: 100%;
        left: 0;
        z-index: 10;
    }
</style>