<template>
  <div>
    Test Login <br>
    <button @click="login()">Login</button>
    <br>
    Test courses <br>
    <button @click="getCourses()"> Get Courses </button>

    {{courses}}
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
      courses: [],
      token: null
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
        app.token = response.data.token
        console.log('response!', response)
      })
      .catch(function(error) {
        console.log('Error!', error)
      })
    },
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
