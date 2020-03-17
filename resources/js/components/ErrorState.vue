<template>
  <div>
    <md-empty-state
      md-rounded
      class="md-error"
      md-icon="error"
      md-label="Error"
      :md-description="convertError()"
    />
  </div>
</template>
<script>
  import Vue from 'vue'
  import { MdEmptyState } from 'vue-material/dist/components'

  Vue.use(MdEmptyState)

  export default {
    props: ['error'],
    name: 'error-state',
    components: {

    },
    methods: {
      convertError() {
        return typeof error !== 'string' ? error.toString() : error
      }
    },
    data() {
      return {

      }
    }
}
</script>
<style lang="scss">
    .md-error i.md-icon.md-icon-font.md-empty-state-icon.md-theme-default {
       color: #f31937; 
    }
</style>
