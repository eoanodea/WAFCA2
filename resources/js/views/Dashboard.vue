<template>
    
    <div
        class="md-layout md-gutter md-alignment-top-space-around show-grid"
    >
        <md-card class="md-layout-item md-medium-size-45 md-small-size-45 md-xsmall-size-90">
            <md-card-header>
              <div class="md-title">Popular Courses this year</div>
            </md-card-header>
            <line-chart />
        </md-card>
        
        <md-card class="md-layout-item md-medium-size-45 md-small-size-45 md-xsmall-size-100">
            <md-card-header>
              <div class="md-title">Enrolment Status</div>
            </md-card-header>
            <pie-chart />
        </md-card>
      
      </div>
</template>
<script>
  import Vue from 'vue'
  import LineChart from './../components/charts/LineChart'
  import PieChart from './../components/charts/PieChart'

  export default {
    name: 'dashboard',
    components: {
      LineChart,
      PieChart
    },
    data() {
      return {

      }
    }
}
</script>
<style>
</style>
