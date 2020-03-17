<template>
    <loading-indicator v-if="loading" />
    <div v-else-if="!error" class="md-layout md-gutter md-alignment-top-space-between">
        
        <md-card class="md-layout-item md-medium-size-45 md-small-size-45 md-xsmall-size-100">
            <md-card-header>
                <div class="md-title">{{course.title}}</div>
                <div class="md-subhead">{{new Date(course.created_at).toDateString()}}</div>
            </md-card-header>

            <md-card-content>
                {{course.description}}
            </md-card-content>
        </md-card>

        <md-card class="md-layout-item md-medium-size-45 md-small-size-45 md-xsmall-size-100">
            <md-card-header>
                <div class="md-title">Course Actions</div>
            </md-card-header>
            <md-list>
                <md-list-item :to="`/course/edit/${this.$route.params.id}`">
                    <md-icon class="md-primary">edit</md-icon>
                    <div class="md-list-item-text">
                        <span>Edit Course</span>
                    </div>
                </md-list-item>
                <md-list-item button>
                    <md-icon class="md-primary">delete</md-icon>
                    <div class="md-list-item-text">
                        <span>Delete Course</span>
                    </div>
                </md-list-item>
            </md-list>
        </md-card>

        <md-card class="md-layout-item md-medium-size-45 md-small-size-45 md-xsmall-size-100">
            <md-list>
                <md-list-item>
                    <md-icon class="md-primary">info</md-icon>
                    <div class="md-list-item-text">
                        <span>{{course.id}}</span>
                        <span>Course ID</span>
                    </div>
                </md-list-item>
                <md-list-item>
                    <md-icon class="md-primary">work</md-icon>
                    <div class="md-list-item-text">
                        <span>{{course.points}}</span>
                        <span>Points</span>
                    </div>
                </md-list-item>
                <md-list-item>
                    <md-icon class="md-primary">trending_up</md-icon>
                    <div class="md-list-item-text">
                        <span>{{course.level}}</span>
                        <span>Level</span>
                    </div>
                </md-list-item>
                <md-list-item>
                    <md-icon class="md-primary">access_time</md-icon>
                    <div class="md-list-item-text">
                        <span>{{new Date(course.updated_at).toDateString()}}</span>
                        <span>Last Updated</span>
                    </div>
                </md-list-item>
            </md-list>
        </md-card>

    </div>
    <error-state v-else :error="error" />
</template>
<script>
    import Vue from 'vue'
    import { mapGetters } from 'vuex'
    import LoadingIndicator from './../../components/LoadingIndicator'
    import ErrorState from './../../components/ErrorState'
    import {MdCard, MdList} from 'vue-material/dist/components'

    Vue.use(MdCard)
    Vue.use(MdList)

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
            if(!this.course || this.course.id !== this.$route.params.id) {
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
<style lang="scss" scoped>
    .md-card {
        width: 320px;
        margin: 4px;
        display: inline-block;
        vertical-align: top;
    }
    .md-list-item-text {
        flex-direction: column-reverse;
    }
    .md-list-item-text :nth-child(2) {
        font-size: 0.7em;
        color: #f2f2f2bd;
    }
</style>