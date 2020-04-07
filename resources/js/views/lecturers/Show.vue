<template>
    <loading-indicator v-if="loading" />
    <div v-else-if="lecturer && !error" class="md-layout md-gutter md-alignment-top-space-between show-grid">
        
        <md-card class="md-layout-item md-medium-size-45 md-small-size-45 md-xsmall-size-100">
            <md-card-header>
                <div class="md-title">{{lecturer.name}}</div>
                <div class="md-subhead">Joined {{new Date(lecturer.created_at).toDateString()}}</div>
            </md-card-header>

            <md-card-content>
                {{lecturer.description}}
            </md-card-content>
        </md-card>

        <md-card class="md-layout-item md-medium-size-45 md-small-size-45 md-xsmall-size-100">
            <md-card-header>
                <div class="md-title">Lecturer Actions</div>
            </md-card-header>
            <md-list>
                <md-list-item :to="`/lecturer/edit/${this.$route.params.id}`">
                    <md-icon class="md-primary">edit</md-icon>
                    <div class="md-list-item-text">
                        <span>Edit Lecturer</span>
                    </div>
                </md-list-item>
                <md-list-item @click="handleDialog()">
                    <md-icon class="md-primary">delete</md-icon>
                    <div class="md-list-item-text">
                        <span>Delete Lecturer</span>
                    </div>
                </md-list-item>
            </md-list>
        </md-card>

        <md-card class="md-layout-item md-medium-size-45 md-small-size-45 md-xsmall-size-100">
            <md-card-header>
                <div class="md-title">Lecturer Information</div>
            </md-card-header>
            <md-list>
                <md-list-item>
                    <md-icon class="md-primary">info</md-icon>
                    <div class="md-list-item-text">
                        <span>{{lecturer.id}}</span>
                        <span>Lecturer ID</span>
                    </div>
                </md-list-item>
                <md-list-item>
                    <md-icon class="md-primary">face</md-icon>
                    <div class="md-list-item-text">
                        <span>{{lecturer.enrolments.length}}</span>
                        <span>Enrolments</span>
                    </div>
                </md-list-item>
                <md-list-item :href="'mailto:' + lecturer.email">
                    <md-icon class="md-primary">email</md-icon>
                    <div class="md-list-item-text">
                        <span>{{lecturer.email}}</span>
                        <span>Email</span>
                    </div>
                </md-list-item>
                <md-list-item :href="'tel:' + lecturer.phone">
                    <md-icon class="md-primary">phone</md-icon>
                    <div class="md-list-item-text">
                        <span>{{lecturer.phone}}</span>
                        <span>Phone</span>
                    </div>
                </md-list-item>
                <md-list-item>
                    <md-icon class="md-primary">home</md-icon>
                    <div class="md-list-item-text">
                        <span>{{lecturer.address}}</span>
                        <span>Address</span>
                    </div>
                </md-list-item>
                <md-list-item>
                    <md-icon class="md-primary">access_time</md-icon>
                    <div class="md-list-item-text">
                        <span>{{new Date(lecturer.updated_at).toDateString()}}</span>
                        <span>Last Updated</span>
                    </div>
                </md-list-item>
            </md-list>
        </md-card>

        <md-card class="md-layout-item md-medium-size-45 md-small-size-45 md-xsmall-size-100">
            <md-card-header>
                <div class="md-title">Enrolment Breakdown</div>
            </md-card-header>
            <pie-chart class="card-chart" v-if="lecturer.enrolments.length > 0" :enrolments="lecturer.enrolments" />
            <md-card-content v-else>This Lecturer has no enrolments</md-card-content>
        </md-card>

        <lecturer-delete 
            :showDialog="showDialog" 
            :id="lecturer.id" 
            v-on:handle-dialog="handleDialog"
            v-if="!lecturer.enrolments || lecturer.enrolments.length === 0"
        />
        <delete-stepper 
            v-else 
            :id="lecturer.id"
            type="lecturer"
            :showDialog="showDialog" 
            :enrolments="lecturer.enrolments" 
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
    import LecturerDelete from './Delete'
    import DeleteStepper from './../../components/enrolments/DeleteStepper'
    import PieChart from './../../components/charts/PieChart'

    Vue.use(MdCard)
    Vue.use(MdList)

    export default {
        name: 'lecturer',
        data: () => ({
            showDialog: false
        }),
        /**
         * Check if lecturer is null
         * If so, fetch the lecturer from the vueX store
         */
        created() {
            if(!this.lecturer || this.lecturer.id !== this.$route.params.id) {
                this.$store.dispatch('lecturer/loadLecturer', parseInt(this.$route.params.id))
            }
        },
        methods: {
            retry() {
                this.$store.dispatch('lecturer/loadLecturer', parseInt(this.$route.params.id))
            },
            handleDialog() {
                this.showDialog = !this.showDialog
            },
            handleBulkDeleteCompleted() {
                console.log('bulk delete complete!!')
                this.$router.replace({
                        name: `lecturers`
                })
            }
        },
        components: {
            LoadingIndicator,
            ErrorState,
            LecturerDelete,
            DeleteStepper,
            PieChart
        },
        computed: {
            ...mapGetters({
                lecturer: 'lecturer/lecturer',
                loading: 'lecturer/loading',
                error: 'lecturer/error'
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
        color: #f2f2f2bd;
    }
</style>