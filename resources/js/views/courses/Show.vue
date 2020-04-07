<template>
    <loading-indicator v-if="loading" />
    <div v-else-if="course && !error" class="md-layout md-gutter md-alignment-top-space-between show-grid">
        
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
                <md-list-item @click="handleDialog()">
                    <md-icon class="md-primary">delete</md-icon>
                    <div class="md-list-item-text">
                        <span>Delete Course</span>
                    </div>
                </md-list-item>
            </md-list>
        </md-card>

        <md-card class="md-layout-item md-medium-size-45 md-small-size-45 md-xsmall-size-100">
            <md-card-header>
                <div class="md-title">Course Information</div>
            </md-card-header>
            <md-list>
                <md-list-item>
                    <md-icon class="md-primary">info</md-icon>
                    <div class="md-list-item-text">
                        <span>{{course.id}}</span>
                        <span>Course ID</span>
                    </div>
                </md-list-item>
                <md-list-item>
                    <md-icon class="md-primary">face</md-icon>
                    <div class="md-list-item-text">
                        <span>{{course.enrolments.length}}</span>
                        <span>Enrolments</span>
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

        <md-card class="md-layout-item md-medium-size-45 md-small-size-45 md-xsmall-size-100">
            <md-card-header>
                <div class="md-title">Enrolment Breakdown</div>
            </md-card-header>
            <pie-chart class="card-chart" v-if="course.enrolments.length > 0" :enrolments="course.enrolments" />
            <md-card-content v-else>This Course has no enrolments</md-card-content>
        </md-card>

        <course-delete 
            :showDialog="showDialog" 
            :id="course.id" 
            v-on:handle-dialog="handleDialog"
            v-if="!course.enrolments || course.enrolments.length === 0"
        />
        <delete-stepper 
            v-else 
            :id="course.id"
            type="course"
            :showDialog="showDialog" 
            :enrolments="course.enrolments" 
            v-on:complete="handleBulkDeleteCompleted" 
            v-on:handle-dialog="handleDialog"
        />
    </div>
    <error-state 
        v-else-if="error" 
        :error="error"
        v-on:retry="retry"
        canRetry="true"        
    />
</template>
<script>
    import Vue from 'vue'
    import { mapGetters } from 'vuex'
    import LoadingIndicator from './../../components/LoadingIndicator'
    import ErrorState from './../../components/ErrorState'
    import {MdCard, MdList} from 'vue-material/dist/components'
    import CourseDelete from './Delete'
    import DeleteStepper from './../../components/enrolments/DeleteStepper'
    import PieChart from './../../components/charts/PieChart'


    Vue.use(MdCard)
    Vue.use(MdList)

    export default {
        name: 'course',
        data: () => ({
            showDialog: false
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
        methods: {
            retry() {
                this.$store.dispatch('course/loadCourse', parseInt(this.$route.params.id))
            },
            handleDialog() {
                this.showDialog = !this.showDialog
            },
            handleBulkDeleteCompleted() {
                console.log('bulk delete complete!!')
                this.$router.replace({
                        name: `courses`
                })
            }
        },
        components: {
            LoadingIndicator,
            ErrorState,
            CourseDelete,
            DeleteStepper,
            PieChart
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
    .card-chart {
        padding: 40px;
    }
    .md-list-item-text {
        flex-direction: column-reverse;
    }
    .md-list-item-text :nth-child(2) {
        font-size: 0.7em;
    }
</style>