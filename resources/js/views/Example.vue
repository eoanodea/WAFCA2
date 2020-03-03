<template>
  <div>
    Test Login <br>
    <button @click="login()">Login</button>
    <br>
    Test courses <br>
    <button @click="getCourses()"> Get Courses </button>
  </div>
</template>
<script>
export default {
  name: 'example',
  components: {

  },
  data() {
    return {
      email: "sam@bloggs.com",
      password: "secret",
      name: "",
      courses: []
    }
  },
  methods: {
    login() {
      let app = this;
      axios.post('/api/login', {
        email: app.email,
        password: app.password
      })
      .then(function(response) {
        console.log('response!', response)
      })
      .catch(function(error) {
        console.log('Error!', error)
      })
    },
    getCourses() {
      axios.get('/api/courses', {
        headers: { Authorization: 'Bearer ' + token}
      })
      .then(function (response) {
         console.log(response.data);
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
