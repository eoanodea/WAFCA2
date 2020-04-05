/*
 * File: Header.vue
 * Project: vue-portfolio
 * Version: 0.1.0
 * File Created: Tuesday, 11th February 2020 2:01:27 pm
 * Author: Eoan O'Dea - eoan@wspace.ie
 * ---------------
 * File Description: Application Header and side drawer
 * Last Modified: Tuesday, 11th February 2020 2:08:14 pm
 * Modified By: Eoan O'Dea - eoan@wspace.ie
 * ---------------
 * Copyright 2020 - WebSpace
 */



<template>
    <header class="header-container">
        <md-toolbar class="md-large md-dense md-primary" 
            :md-theme="'bottom-bar-' + theme"
        >
            <!-- <div class="md-toolbar-row"> -->
                <!-- <div class="md-toolbar-section-start"> -->
                    <span class="md-title">My Title</span>
                <!-- </div> -->
                <!-- <div class="md-toolbar-section-end">
                    <md-button class="md-icon-button md-primary" @click="open = !open">
                        <md-icon>menu</md-icon>
                    </md-button>
                </div> -->
            <!-- </div> -->
            <!-- <div class="md-toolbar-row">
                <md-tabs class="md-primary" md-sync-route>
                        <md-tab 
                            v-for="route in renderRoutes()" 
                            v-bind:key="`tab-${route.name}`" 
                            :id="`tab-${route.name}`" 
                            :md-label="route.name" 
                            :to="route.path"
                            :md-icon="route.icon ? route.icon : null"
                            exact
                        />
                </md-tabs>
            </div> -->
        </md-toolbar>
        <!-- <md-drawer class="md-right" :md-active.sync="open">
            <md-toolbar class="md-transparent" md-elevation="0">
                <span class="md-title">Menu</span>
            </md-toolbar>

            <md-list>
                <md-list-item to="/">
                    <md-icon class="md-primary">home</md-icon>
                    <span class="md-list-item-text">Home</span>
                </md-list-item>

                <md-list-item @click="signOut">
                    <md-icon class="md-primary">exit_to_app</md-icon>
                    <span class="md-list-item-text">Sign Out</span>
                </md-list-item>
            </md-list>
        </md-drawer> -->
    </header>
</template>
<script>
    import Vue from 'vue'
    import { MdList, MdDrawer, MdToolbar, MdTabs, MdButton, MdIcon } from 'vue-material/dist/components'
    import { mapActions, mapGetters } from 'vuex'

    Vue.use(MdList)
    Vue.use(MdTabs)
    Vue.use(MdToolbar)
    Vue.use(MdButton)
    Vue.use(MdIcon)
    Vue.use(MdDrawer)

    export default {
        name: 'Header',   
        props: ['theme'],
        data() {
            return {
                open: false,
                routes: this.$router.options.routes
            }
        },
        components: {
            //
        },
        /**
         * Check if the drawer is open on route change
         * if so close the drawer
         */
        watch: {
            '$route' (to, from, options) {
                if(this.open) {
                    this.open = false 
                }
            }
        },
        computed: {
            ...mapGetters({
                user: 'auth/user'
            })
        },
        methods: {
            ...mapActions({
                signOutAction: 'auth/signOut'
            }),
            renderRoutes() {
                const {routes, user} = this

                const renderedRoutes = (user && user.name)
                ? routes.filter(dat => dat.display === "top" && dat.name !== "signin")
                : routes.filter(dat => !dat.beforeEnter)

                return renderedRoutes
            },
            cleanRoutes() {
                this.routes = (this.user && this.user.name)
                ? this.$router.options.routes.filter(dat => dat.display === "top" && dat.name !== "signin")
                : this.$router.options.routes.filter(dat => !dat.beforeEnter)
            },
            signOut() {
                this.signOutAction().then(() => {
                    this.open = false
                    this.$router.replace({
                        name: 'signin'
                    })
                })
            },
            tabIsActive(path) {
                return this.$route.path === path
            }
        }
    }
</script>
<style lang="scss">
    .header-container, html {
        overflow-x: hidden;
    }
</style>