<template>
    
    <div
        class="md-layout md-gutter md-alignment-top-space-around show-grid"
    >
        <md-card class="md-layout-item md-large-size-33 md-medium-size-45 md-small-size-45 md-xsmall-size-90">
            <md-card-header>
              <div class="md-title">Course Enrolments by Month</div>
            </md-card-header>
            <line-chart class="card-chart" v-if="courses.length > 0" :courses="courses" />
            <loading-indicator v-else />
        </md-card>
        
        <md-card class="md-layout-item md-large-size-33 md-medium-size-45 md-small-size-45 md-xsmall-size-90">
            <md-card-header>
              <div class="md-title">Enrolment Breakdown</div>
            </md-card-header>
            <pie-chart class="card-chart" v-if="enrolments.length > 0" :enrolments="enrolments" />
            <loading-indicator v-else />
        </md-card>
      
      </div>
</template>
<script>
  import Vue from 'vue'
  import LineChart from './../components/charts/LineChart'
  import PieChart from './../components/charts/PieChart'
  import { mapGetters } from "vuex";
  import LoadingIndicator from './../components/LoadingIndicator'

  export default {
    name: 'dashboard',
    components: {
      LineChart,
      PieChart,
      LoadingIndicator
    },
    created() {
      const app = this;
      /**
       * Load enrolments from the store if they do not already exist
       */
      if (app.enrolments.length < 1) {
        app.$store.dispatch("enrolment/loadEnrolments")
      }
      /**
       * Load courses from the store if they do not already exist
       */
      if (app.courses.length < 1) {
        app.$store.dispatch("course/loadCourses")
      }
    },
    data() {
      return {

      }
    },
    computed: {
      ...mapGetters({
          enrolments: "enrolment/enrolments",
          courses: "course/courses"
      })
    }
}
</script>
<style>
  .card-chart {
    padding: 20px
  }

</style>
