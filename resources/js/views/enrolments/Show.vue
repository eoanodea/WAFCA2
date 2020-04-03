<template>
    <loading-indicator v-if="loading" />
    <div v-else-if="enrolment && !error" class="md-layout md-gutter md-alignment-top-space-between show-grid">
        
        <md-card class="md-layout-item md-medium-size-45 md-small-size-45 md-xsmall-size-100">
            <md-card-header>
                <div class="md-title">Status: <span style="text-transform: capitalize;">{{enrolment.status.replace('_', ' ')}}</span></div>
                <div class="md-subhead">Joined {{new Date(enrolment.created_at).toDateString()}}</div>
            </md-card-header>

            <md-card-content>
                {{enrolment.description}}
            </md-card-content>
        </md-card>

        <md-card class="md-layout-item md-medium-size-45 md-small-size-45 md-xsmall-size-100">
            <md-card-header>
                <div class="md-title">Enrolment Actions</div>
            </md-card-header>
            <md-list>
                <md-list-item :to="`/enrolment/edit/${this.$route.params.id}`">
                    <md-icon class="md-primary">edit</md-icon>
                    <div class="md-list-item-text">
                        <span>Edit Enrolment</span>
                    </div>
                </md-list-item>
                <md-list-item @click="handleDialog()">
                    <md-icon class="md-primary">delete</md-icon>
                    <div class="md-list-item-text">
                        <span>Delete Enrolment</span>
                    </div>
                </md-list-item>
            </md-list>
        </md-card>

        <md-card class="md-layout-item md-medium-size-45 md-small-size-45 md-xsmall-size-100">
            <md-card-header>
                <div class="md-title">Enrolment Information</div>
            </md-card-header>
            <md-list>
                <md-list-item>
                    <md-icon class="md-primary">info</md-icon>
                    <div class="md-list-item-text">
                        <span>{{enrolment.id}}</span>
                        <span>Enrolment ID</span>
                    </div>
                </md-list-item>
                <md-list-item>
                    <md-icon class="md-primary">calendar_today</md-icon>
                    <div class="md-list-item-text">
                        <span>{{enrolment.date}}</span>
                        <span>Date</span>
                    </div>
                </md-list-item>
                <md-list-item>
                    <md-icon class="md-primary">access_alarm</md-icon>
                    <div class="md-list-item-text">
                        <span>{{enrolment.time}}</span>
                        <span>Time</span>
                    </div>
                </md-list-item>
                <md-list-item :to="`/lecturer/show/${enrolment.lecturer.id}`">
                    <md-icon class="md-primary">supervised_user_circle</md-icon>
                    <div class="md-list-item-text">
                        <span>{{enrolment.lecturer.name}}</span>
                        <span>Lecturer</span>
                    </div>
                </md-list-item>
                <md-list-item :to="`/course/show/${enrolment.course.id}`">
                    <md-icon class="md-primary">menu_book</md-icon>
                    <div class="md-list-item-text">
                        <span>{{enrolment.course.title}}</span>
                        <span>Course</span>
                    </div>
                </md-list-item>
                <md-list-item>
                    <md-icon class="md-primary">access_time</md-icon>
                    <div class="md-list-item-text">
                        <span>{{new Date(enrolment.updated_at).toDateString()}}</span>
                        <span>Last Updated</span>
                    </div>
                </md-list-item>
            </md-list>
        </md-card>
        <enrolment-delete 
            :showDialog="showDialog" 
            :id="enrolment.id" 
            v-on:handle-dialog="handleDialog"
        />
    </div>
    <error-state v-else-if="error" :error="error" />
</template>
<script>
    import Vue from 'vue'
    import { mapGetters } from 'vuex'
    import LoadingIndicator from './../../components/LoadingIndicator'
    import ErrorState from './../../components/ErrorState'
    import {MdCard, MdList} from 'vue-material/dist/components'
    import EnrolmentDelete from './Delete'

    Vue.use(MdCard)
    Vue.use(MdList)

    export default {
        name: 'enrolment',
        data: () => ({
            showDialog: false
        }),
        /**
         * Check if enrolment is null
         * If so, fetch the enrolment from the vueX store
         */
        created() {
            if(!this.enrolment || this.enrolment.id !== this.$route.params.id) {
                this.$store.dispatch('enrolment/loadEnrolment', parseInt(this.$route.params.id))
            }
        },
        methods: {
            handleDialog() {
                this.showDialog = !this.showDialog
            }
        },
        components: {
            LoadingIndicator,
            ErrorState,
            EnrolmentDelete
        },
        computed: {
            ...mapGetters({
                enrolment: 'enrolment/enrolment',
                loading: 'enrolment/loading',
                error: 'enrolment/error'
            })
        }
    }
</script>
<style lang="scss" scoped>
    .show-grid {
        margin: 20px!important;   
    }
    .show-grid div {
        @media (max-width: 600px) {
            margin: 10px;
        }
    }
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