<template>
    <div class="progress-container">
        <md-progress-spinner class="progress" :md-diameter="80" md-mode="indeterminate"></md-progress-spinner>
    </div>
</template>
<script>
    import Vue from 'vue'
    import { MdProgress } from 'vue-material/dist/components'

    Vue.use(MdProgress)

    export default {
        name: 'loading-indicator',
    }
</script>
<style lang="scss" scoped>
    .progress-container {
        text-align: center;
    }
    .progress {
        margin: 100px auto;
    }
</style>
