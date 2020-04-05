<template>
  <div
   class="md-layout md-gutter md-alignment-top-space-around show-grid"
   >
    <md-empty-state
      md-rounded
      md-icon="import_contacts"
      md-label="Welcome"
      md-description="Mange your courses, lecturers and enrolments all from our cloud based management system."
    >
  <div class="md-layout md-gutter">
    <md-button class="md-layout-item md-raised md-background empty-state-button" to="/signup">Sign up</md-button>
    <md-button class="md-layout-item md-raised md-primary empty-state-button" to="/signin">Login</md-button>
  </div>
    </md-empty-state>
  </div>
</template>
<script>
  import Vue from 'vue'
  import { MdEmptyState } from 'vue-material/dist/components'
  import BarChart from './../components/charts/BarChart'

  Vue.use(MdEmptyState)

  export default {
    name: 'home',
    components: {
      BarChart
    },
    data() {
      return {

      }
    }
}
</script>
<style lang="scss" scoped>
  .empty-state-button{
    margin: 6px 8px!important;
  }
</style>

