<template>
    <div class="md-layout-item md-large-size-80 md-medium-size-80 md-small-size-90 md-xsmall-size-100">
        <loading-indicator v-if="loading" />
        <md-table 
            md-card
            v-else-if="!error && searched" 
            v-model="searched" 
            md-sort="name" 
            md-sort-order="asc" 
            @md-selected="onSelect"  
        >
            <md-table-toolbar>
                <div class="md-toolbar-row">
                <div class="md-toolbar-section-start">
                <h1 class="md-title">Enrolments</h1>
                </div>
                <div class="md-toolbar-section-end">
                    <md-button class="md-fab md-primary" to="/enrolment/new">
                        <md-icon>add</md-icon>
                    </md-button>
                </div>
                </div>

                <div class="md-toolbar-row md-toolbar-offset">
                    <md-field md-clearable>
                        <md-icon>search</md-icon>
                        <md-input placeholder="Search by name..." v-model="search" @input="searchOnTable" />
                    </md-field>      
                </div>  
            </md-table-toolbar>

            <md-progress-bar md-mode="indeterminate" v-if="deleting" />
            <md-table-toolbar slot="md-table-alternate-header" class="md-primary" slot-scope="{ count }">
                <div class="md-toolbar-section-start">{{ getAlternateLabel(count) }}</div>

                <div class="md-toolbar-section-end">
                <md-button class="md-fab md-accent" :disabled="deleting" @click="bulkDelete">
                    <md-icon>delete</md-icon>
                </md-button>
                </div>
            </md-table-toolbar>

            <md-table-empty-state
                md-label="No enrolments found"
                :md-description="`No enrolments found for this search query. Try a different search term or create a new enrolment.`">
                <md-button class="md-primary md-raised" to="/enrolment/new">Create New Enrolment</md-button>
            </md-table-empty-state>

            <md-table-row 
                v-if="!isMobile"
                slot="md-table-row" 
                slot-scope="{ item }" 
                md-selectable="multiple" 
                @click="showDetail(item)"
            >
                <md-table-cell md-label="Date" md-sort-by="date">{{ new Date(item.date).toDateString() }}</md-table-cell>
                <md-table-cell md-label="Time" md-sort-by="time">{{ item.time }}</md-table-cell>
                <md-table-cell md-label="Status" md-sort-by="status">{{ item.status.replace('_', ' ') }}</md-table-cell>
            </md-table-row>
            <md-table-row 
                v-else
                slot="md-table-row" 
                slot-scope="{ item }" 
                md-selectable="multiple" 
                @click="showDetail(item)"
            >
                <md-table-cell md-label="Date" md-sort-by="date">{{ new Date(item.date).toDateString() }}</md-table-cell>
                <md-table-cell md-label="Status" md-sort-by="status">{{ item.status.replace('_', ' ') }}</md-table-cell>
            </md-table-row>
        </md-table>
        <error-state 
            v-else 
            :error="error" 
            v-on:retry="retry"
            canRetry="true"
        />

        <md-snackbar :md-active.sync="deleting" :md-duration="Infinity">{{deletingMessage}}</md-snackbar>
    </div>
</template>

<script>
    import Vue from 'vue'
    import {MdTable, MdContent, MdRipple, MdCheckbox}  from 'vue-material/dist/components'
    import { mapGetters, mapActions } from 'vuex'
    import LoadingIndicator from './../../components/LoadingIndicator'
    import ErrorState from './../../components/ErrorState'

    Vue.use(MdTable)
    Vue.use(MdContent)
    Vue.use(MdRipple)
    Vue.use(MdCheckbox)


    const toLower = text => {
        return text.toString().toLowerCase()
    }

    const searchByName = (items, term) => {
        if (term) {
            return items.filter(item => toLower(item.title).includes(toLower(term)))
        }

        return items
    }

    export default {
        name: 'enrolments',
        data: () => ({
            search: null,
            searched: [],
            selected: [],
            deletingMessage: null,
            deleting: false,
            isMobile:  false
        }),
        methods: {
            retry() {
                this.$store.dispatch('enrolment/loadEnrolments').then(() => {
                    this.searched = this.enrolments
                })
            },
            searchOnTable () {
                this.searched = searchByName(this.enrolments, this.search)
            },
            onSelect (item) {
                this.selected = item
            },
            showDetail (item) {
                this.$router.replace({
                    path: `/enrolment/show/${item.id}`
                })
            },
            async bulkDelete() {
                let app = this

                app.deletingMessage = `Bulk deleting ${app.selected.length} item${app.selected.length > 1 ? "s" : ""}`
                app.deleting = true
                try {
                    const res = await app.bulkDeleteEnrolment(app.selected)
                   
                    app.deletingMessage = `Bulk delete successful: ${res.deletes} deletes`
                    app.searched = app.enrolments
                } catch(err) {
                    app.deletingMessage = `Bulk delete error: ${err.deletes} deletes, ${err.errors} errors`
                    app.searched = app.enrolments
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
            getAlternateLabel (count) {
                let plural = ''

                if (count > 1) {
                    plural = 's'
                }

                return `${count} enrolment${plural} selected`
            },
            ...mapActions({
                bulkDeleteEnrolment: 'enrolment/bulkDeleteEnrolment'
            })
        },
        created() {
            if(this.enrolments.length < 1) {
                this.$store.dispatch('enrolment/loadEnrolments').then(() => {
                    this.searched = this.enrolments
                })
            } else this.searched = this.enrolments

           /**
            * Detects the screensize and reformats the table accordingly
            */
            this.isMobile = window.matchMedia('screen and (max-width: 600px)').matches
        },
        components: {
            LoadingIndicator,
            ErrorState
        },
        computed: {
            ...mapGetters({
                enrolments: 'enrolment/enrolments',
                loading: 'enrolment/loading',
                error: 'enrolment/error'
            })
        }
    }
</script>

<style lang="scss" scoped>
    .md-input {
        color: #fff;
    }
    .md-table-row {
        cursor: pointer;
    }
</style>