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
  <md-app class="md-card header-container" waterfall md-mode="fixed">
    <md-app-toolbar class="md-large md-dense md-primary" :md-theme="'bottom-bar-' + theme">
      <div class="md-toolbar-row" v-if="!isMobile">
        <router-link to="/">
          <span class="md-title">My Title</span>
        </router-link>
      </div>
      <router-link to="/" v-else>
        <span class="md-title">My Title</span>
      </router-link>
      <div class="md-toolbar-row" v-if="!isMobile">
        <md-bottom-bar
          md-type="shift"
          :md-theme="'bottom-bar-' + theme"
          md-sync-route
          class="header-bottom-bar"
        >
          <md-bottom-bar-item
            v-for="(route, i) in renderRoutes()"
            v-bind:key="`tab-${i}`"
            :id="`tab-${route.name}`"
            :md-label="route.name"
            :to="route.path"
            :md-icon="route.icon ? route.icon : null"
          />
        </md-bottom-bar>
      </div>
    </md-app-toolbar>
  </md-app>
</template>
<script>
import Vue from "vue";
import {
  MdApp,
  MdList,
  MdDrawer,
  MdToolbar,
  MdTabs,
  MdButton,
  MdIcon
} from "vue-material/dist/components";
import { mapActions, mapGetters } from "vuex";

Vue.use(MdList);
Vue.use(MdTabs);
Vue.use(MdToolbar);
Vue.use(MdButton);
Vue.use(MdIcon);
Vue.use(MdDrawer);
Vue.use(MdApp);

export default {
  name: "Header",
  props: ["theme", "isMobile"],
  data() {
    return {
      open: false,
      routes: this.$router.options.routes
    };
  },
  components: {
    //
  },
  /**
   * Check if the drawer is open on route change
   * if so close the drawer
   */
  watch: {
    $route(to, from, options) {
      if (this.open) {
        this.open = false;
      }
    }
  },
  computed: {
    ...mapGetters({
      user: "auth/user"
    })
  },
  methods: {
    ...mapActions({
      signOutAction: "auth/signOut"
    }),
    renderRoutes() {
      const { routes, user } = this;

      let renderedRoutes =
        user && user.name
          ? routes.filter(
              dat =>
                dat.display === "top" &&
                dat.name !== "signin" &&
                dat.name !== "signup"
            )
          : routes.filter(dat => dat.meta.notAuthed);
      return renderedRoutes;
    },
    cleanRoutes() {
      this.routes =
        this.user && this.user.name
          ? this.$router.options.routes.filter(
              dat => dat.display === "top" && dat.name !== "signin"
            )
          : this.$router.options.routes.filter(dat => !dat.beforeEnter);
    },
    signOut() {
      this.signOutAction().then(() => {
        this.open = false;
        this.$router.replace({
          name: "signin"
        });
      });
    },
    tabIsActive(path) {
      return this.$route.path === path;
    }
  }
};
</script>
<style lang="scss" scoped>
.header-container {
  position: fixed !important;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 5 !important;
  border-radius: 0 0 8px 8px;
}
.header-bottom-bar {
  box-shadow: none;
}
</style>