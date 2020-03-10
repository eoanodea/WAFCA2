<template>
  <div>
    
    <br>
    Test courses <br>
    <md-button @click="getCourses()"> Get Courses </md-button>

    {{courses}}
  </div>
</template>
<script>
// import MdButton
export default {
  name: 'example',
  components: {

  },
  data() {
    return {
      courses: [],
    }
  },
  methods: {
    getCourses() {
      let app = this;
      axios.get('/api/courses')
      .then(function (response) {
          console.log(response.data);
          app.courses = response.data
      })
      .catch(function (error) {
          console.log(error);
      })
    }
  }
}
</script>
<style>
</style>
