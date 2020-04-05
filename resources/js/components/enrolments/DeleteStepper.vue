<template>
     <md-dialog 
        md-card
        :md-active="showDialog"
        @md-clicked-outside="handleDialogClose()"
        class="bulk-stepper-dialog"
    >
        <md-steppers :md-active-step.sync="active" md-linear class="bulk-stepper-wrapper" >
            <md-step 
                id="first" 
                md-label="Enrolments detected" 
                :md-done.sync="first"
            >
                <md-empty-state
                    class="md-primary"
                    md-rounded
                    md-icon="error"
                    md-label="Hold your horses..."
                    md-description="This course cannot be deleted until you delete all enrolments associated with it."
                />
            </md-step>
            <md-step 
                id="second" 
                md-label="Delete Enrolments" 
                :md-error="secondStepError" 
                :md-done.sync="second"
                class="bulk-step-wrapper"
            >
                <bulk-delete
                    v-bind:enrolments="enrolments" 
                    v-on:error="setError"
                    v-on:success="deleteSuccess"
                />
            </md-step>
            <md-step 
                id="third" 
                md-label="Delete Course" 
                :md-done.sync="third"
                :md-error="thirdStepError" 
            >
                <md-progress-bar md-mode="indeterminate" v-if="deleting" />
                <md-empty-state
                    class="md-primary"
                    md-rounded
                    md-icon="loop"
                    md-label="Deleting course..."
                    v-if="deleting"
                />
                <md-empty-state
                    class="md-primary"
                    md-rounded
                    md-icon="help"
                    md-label="Confirm deleting course"
                    md-description="Are you sure you want to delete this course? This action cannot be undone."
                    v-else-if="!courseSuccess && !thirdStepError"
                >
                    <md-button class="md-raised md-primary" :disabled="deleting" @click="runDeleteCourse">Confirm</md-button>
                
                </md-empty-state>
                <md-empty-state
                    class="md-primary"
                    md-rounded
                    md-icon="check"
                    md-label="Course deleted successfully!"
                    md-description="Redirecting you..."
                    v-else-if="courseSuccess"
                />
                <error-state
                    v-else
                    :error="thirdStepError"
                />                
            </md-step>
        </md-steppers>
            <md-dialog-actions class="md-card bulk-stepper-dialog-actions">
                <md-button class="md-raised md-accent" @click="handleDialogClose">Close</md-button>
                <md-button v-if="active !== 'first'" class="md-raised md-accent" @click="goBack">Back</md-button>
                <md-button  v-if="active !== 'third'" class="md-raised md-primary" @click="goForward" :disabled="active === 'second' && !enrolmentSuccess">Next</md-button>
            </md-dialog-actions>
     </md-dialog>
</template>

<script>
    import Vue from 'vue'
    import {MdSteppers, MdButton, MdDialog, MdEmptyState}  from 'vue-material/dist/components'
    import BulkDelete from './BulkDelete'
    import ErrorState from './../ErrorState'
import { mapActions } from 'vuex'
    
    Vue.use(MdSteppers)
    Vue.use(MdDialog)
    Vue.use(MdEmptyState)
    Vue.use(MdButton)

    export default {
        props: ['showDialog', 'enrolments', 'id'],
        name: 'delete-stepper',
        data: () => ({
            active: 'first',
            first: false,
            second: false,
            third: false,
            secondStepError: null,
            thirdStepError: null,
            enrolmentSuccess: false,
            courseSuccess: false,
            deleting: false
        }),
        methods: {
            setDone (id, index) {
                this[id] = true

                this.secondStepError = null

                if (index) {
                    this.active = index
                }
            },
            goForward() {this.active === 'first' ? this.active = 'second' : this.active = 'third'},
            goBack() {this.active === 'third' ? this.active = 'second' : this.active = 'first'},
            handleDialogClose() {
                this.$emit('handle-dialog')
            },
            deleteSuccess(type) {
                this.secondStepError = null
                this[type] = true
            },
            setError(err) {
                this.secondStepError = `${err} Enrolment${err.length > 1 ? 's' : ''} were not deleted`
            },
            runDeleteCourse() {
                let app = this
                app.deleting = true
                app.deleteCourse(this.id)
                .then(() => {
                    app.deleting = false
                    app.courseSuccess = true
                    console.log('bulk delete complete!!')
                    this.$router.replace({
                            name: `courses`
                    })
                })
                .catch(function(error) {
                    console.log("error!", error)
                    app.thirdStepError = error
                    app.deleting = false
                })
            },
            /**
             * Delays set deleting to false by 4000 miliseconds,
             * 
             * so the snackbar displays a completion message to the user
             */
            timeOutLabel() {
                let app = this

                setTimeout(function() {
                    app.$emit('complete')
                }, 4000)
            },
            ...mapActions({
                deleteCourse: 'course/deleteCourse'
            })
        },
        components: {
            BulkDelete,
            ErrorState
        }
    }
</script>

<style lang="scss" scoped>
    .bulk-stepper-dialog {
        flex-direction: column;
        max-height: 550px;
    }
    .md-dialog-container {
        position: relative;
    }
    .bulk-stepper-dialog-actions {
        width: 100%;
        position: absolute;
        bottom: 0;
        left: 0;
        background-color: #434343;
    }
    .bulk-step-wrapper {
        max-height: 500px;
        overflow: auto;
        overflow-y: scroll;
        padding: 40px 5px 80px 5px;
    }
</style>