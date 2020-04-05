<template>
    <span>
    <md-content class="md-scrollbar" v-if="!success">
        <md-list>
            <md-subheader>Total Enrolments: {{enrolments.length}}</md-subheader>
            <md-list-item 
                v-for="(enrolment, i) in enrolments" 
                v-bind:key="i"
                :to="`/enrolments/show/${enrolment.id}`"
            >
                <md-icon class="md-primary">assignment_ind</md-icon>
                <div class="md-list-item-text">
                    <span>{{enrolment.id}}: <span class="capitalize">{{enrolment.status.replace('_', ' ')}}</span></span>
                    <span>{{enrolment.date}}</span>
                    <md-divider/>
                </div>
            </md-list-item>
            <md-button class="md-raised md-primary" :disabled="deleting" @click="bulkDelete">Delete these enrolments</md-button>
            <md-progress-bar md-mode="indeterminate" v-if="deleting" />
        </md-list>
    </md-content>
    <md-empty-state
        v-else
        md-rounded
        class="md-primary"
        md-icon="check"
        md-label="Enrolments deleted successfully"
    />
    <md-snackbar :md-active.sync="deleting" :md-duration="Infinity">{{deletingMessage}}</md-snackbar>
    </span>
</template>

<script>
    import Vue from 'vue'
    import { mapGetters, mapActions } from 'vuex'
    import {MdList, MdSubheader, MdButton, MdDivider}  from 'vue-material/dist/components'

    Vue.use(MdList)
    Vue.use(MdSubheader)
    Vue.use(MdButton)
    Vue.use(MdDivider)

    export default {
        props: ['enrolments'],
        name: 'bulk-delete',
        data: () => ({
            deletingMessage: null,
            deleting: false,
            success: false
        }),
        methods: {
            showDetail (item) {
                this.$router.replace({
                    path: `/enrolment/show/${item.id}`
                })
            },
            async bulkDelete() {
                let app = this
                const { enrolments } = app
                console.log('enrolment id!!', enrolments)
                app.deletingMessage = `Bulk deleting ${enrolments.length} item${enrolments.length > 1 ? "s" : ""}`
                app.deleting = true
                try {
                    const res = await app.bulkDeleteEnrolment(enrolments)
                   
                    app.deletingMessage = `Bulk delete successful: ${res.deletes} deletes`
                    app.success = true
                    this.$emit('success', 'enrolmentSuccess')
                } catch(err) {
                    console.log('bulk delete errror!', err)
                    app.deletingMessage = `Bulk delete error: ${err.deletes} deletes, ${err.errors} errors`
                    this.$emit('error', err.errors)
                }
                app.timeOutLabel()
            },
            /**
             * Delays set deleting to false by 4000 miliseconds,
             * 
             * so the snackbar displays a completion message to the user
             */
            timeOutLabel() {
                let app = this

                setTimeout(function() {
                    app.deleting = false
                    app.deletingMessage = null
                }, 4000)
            },
            ...mapActions({
                bulkDeleteEnrolment: 'enrolment/bulkDeleteEnrolment'
            })
        }
    }
</script>

<style lang="scss" scoped>
    .md-list-item-text :nth-child(2) {
        font-size: 0.7em;
    }
</style>