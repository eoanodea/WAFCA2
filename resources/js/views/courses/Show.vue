<template>
    <loading-indicator v-if="loading" />
    <p v-else-if="!error">{{course}}</p>
    <error-state v-else :error="error" />
</template>
<script>
    import Vue from 'vue'
    import { mapGetters } from 'vuex'
    import LoadingIndicator from './../../components/LoadingIndicator'
    import ErrorState from './../../components/ErrorState'

    export default {
        name: 'course',
        data: () => ({
            //
        }),
        /**
         * Check if course is null
         * If so, fetch the course from the vueX store
         */
        created() {
            if(!this.course) {
                this.$store.dispatch('course/loadCourse', parseInt(this.$route.params.id))
            }
        },
        components: {
            LoadingIndicator,
            ErrorState
        },
        computed: {
            ...mapGetters({
                course: 'course/course',
                loading: 'course/loading',
                error: 'course/error'
            })
        }
    }
</script>