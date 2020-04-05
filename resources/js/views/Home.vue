<template>
  <div
   class="md-layout md-gutter md-alignment-top-space-around show-grid"
   >
    <!-- <md-empty-state
      md-rounded
      md-icon="import_contacts"
      md-label="Welcome"
      md-description="Creating project, you'll be able to upload your design and collaborate with people."
    /> -->
    <md-card class="md-layout-item md-medium-size-45 md-small-size-45 md-xsmall-size-100">
      <bar-chart />
    </md-card>
    <md-card class="md-layout-item md-medium-size-45 md-small-size-45 md-xsmall-size-100">
      <bar-chart />
    </md-card>
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
<style>
</style>
