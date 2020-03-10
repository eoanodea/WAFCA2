<template>
  <div>
    <md-empty-state
      md-rounded
      md-icon="import_contacts"
      md-label="Welcome"
      md-description="Creating project, you'll be able to upload your design and collaborate with people."
    />
  </div>
</template>
<script>
  import Vue from 'vue'
  import { MdEmptyState } from 'vue-material/dist/components'

  Vue.use(MdEmptyState)

  export default {
    name: 'home',
    components: {

    },
    data() {
      return {

      }
    }
}
</script>
<style>
</style>
