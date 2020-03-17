<template>
    <h2>loading</h2>
    <!-- <md-progress-spinner md-mode="indeterminate"></md-progress-spinner> -->
</template>
<script>
    import Vue from 'vue'
    import { MdProgressSpinner } from 'vue-material/dist/components'

    Vue.use(MdProgressSpinner)

    export default {
        name: 'loading-indicator',
    }
</script>
<style>
</style>
