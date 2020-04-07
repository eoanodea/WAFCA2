<template>
  <div>
    <md-empty-state
      md-rounded
      class="md-error"
      md-icon="error"
      md-label="Error"
      :md-description="convertError()"
    >
      <md-button v-if="canRetry" class="md-raised md-primary" @click="retry">Try Again</md-button>
    </md-empty-state>
  </div>
</template>
<script>
  import Vue from 'vue'
  import { MdEmptyState } from 'vue-material/dist/components'

  Vue.use(MdEmptyState)

  export default {
    props: ['error', 'canRetry'],
    name: 'error-state',
    components: {

    },
    methods: {
      convertError() {
        const {error} = this
        return typeof error !== 'string' ? error.toString() : error
      },
      retry() {
        this.$emit('retry')
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
