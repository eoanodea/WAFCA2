<template>
    
    <div
        class="md-layout md-gutter md-alignment-top-space-around show-grid"
    >
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
  import BarChart from './../components/charts/BarChart'

  export default {
    name: 'dashboard',
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
