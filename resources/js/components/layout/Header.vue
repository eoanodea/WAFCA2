/*
 * File: Header.vue
 * Project: vue-portfolio
 * Version: 0.1.0
 * File Created: Tuesday, 11th February 2020 2:01:27 pm
 * Author: Eoan O'Dea - eoan@wspace.ie
 * ---------------
 * File Description: Application Header
 * Last Modified: Tuesday, 11th February 2020 2:08:14 pm
 * Modified By: Eoan O'Dea - eoan@wspace.ie
 * ---------------
 * Copyright 2020 - WebSpace
 */



<template>
    <md-app>
        <p>hello header</p>
        <md-app-toolbar class="md-large md-dense md-primary">
            <div class="md-toolbar-row">
                <div class="md-toolbar-section-start">
                    <span class="md-title">My Title</span>
                </div>
                <div class="md-toolbar-section-end">
                    <md-button class="md-icon-button md-primary">
                        <md-icon>menu</md-icon>
                    </md-button>
                </div>
            </div>
            <div class="md-toolbar-row">
                <md-tabs class="md-primary">
                    <md-tab id="tab-home" md-label="Home" to="/" exact></md-tab>
                    <md-tab id="tab-example" md-label="Example" to="/example" exact></md-tab>
                    
                </md-tabs>
            </div>
        </md-app-toolbar>
    </md-app>
</template>
<script>
    import Vue from 'vue'
    import { MdApp, MdToolbar, MdTabs, MdButton, MdIcon } from 'vue-material/dist/components'

    Vue.use(MdApp)
    Vue.use(MdTabs)
    Vue.use(MdToolbar)
    Vue.use(MdButton)
    Vue.use(MdIcon)

    export default {
        name: 'Header',   
    }
</script>