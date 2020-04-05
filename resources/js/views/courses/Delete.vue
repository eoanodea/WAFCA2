<template>
    <div>
        <md-dialog 
            md-card
            :md-active="showDialog"
            @md-clicked-outside="handleDialogClose()"
            >
            <md-progress-bar md-mode="indeterminate" v-if="sending" />
            <md-dialog-title>Are you sure you want to delete this course?</md-dialog-title>
            <md-dialog-content>This action cannot be undone</md-dialog-content>
            
            <md-dialog-actions>
                <md-button class="md-raised md-accent" @click="handleDialogClose" :disabled="sending">Close</md-button>
                <md-button class="md-raised md-primary" @click="startDelete()" :disabled="sending">Confirm</md-button>
            </md-dialog-actions>
        </md-dialog>
        <md-snackbar :md-active.sync="success">Deleted Successfully!</md-snackbar>
        <md-snackbar :md-active.sync="hasError">{{error}}</md-snackbar>
    </div>
</template>

<script>
    import Vue from 'vue'
    import { mapActions, mapGetters } from 'vuex'
    import {MdDialog} from 'vue-material/dist/components'

    Vue.use(MdDialog)

    export default {
        props: ['id', 'showDialog'],
        name: 'course-delete',
        data: () => ({
            error: null,
            hasError: false,
            success: false,
            sending: false
        }),
        methods: {
            startDelete() {
                let app = this
                app.sending = true
                app.deleteCourse(this.id)
                .then(() => {
                    app.sending = false
                    app.success = true
                    this.$router.replace({
                        name: `courses`
                    })
                })
                .catch(function(error) {
                    console.log("error!", error)
                    app.hasError = true
                    app.error = error
                    app.sending = false
                })
            },
            handleDialogClose() {
                this.$emit('handle-dialog')
            },
            ...mapActions({
                deleteCourse: 'course/deleteCourse'
            }),
        }
    }
</script>