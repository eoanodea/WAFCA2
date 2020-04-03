<template>
    <div class="md-layout md-gutter md-alignment-center-space-around index-container">
        <loading-indicator v-if="loading" />
        <md-table 
            v-else-if="!error && searched" 
            v-model="searched" 
            md-sort="name" 
            md-sort-order="asc" 
            md-card 
            md-fixed-header
            class="md-layout-item md-medium-size-100 md-small-size-90 md-xsmall-size-90"
            @md-selected="onSelect"
        >
        <md-table-toolbar>
            <div class="md-toolbar-row">
            <div class="md-toolbar-section-start">
            <h1 class="md-title">Lecturers</h1>
            </div>
            <div class="md-toolbar-section-end">
                <md-button class="md-fab md-primary" to="/lecturer/new">
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
            md-label="No lecturers found"
            :md-description="`No lecturers found for this search query. Try a different search term or create a new lecturer.`">
            <md-button class="md-primary md-raised" to="/lecturer/new">Create New Lecturer</md-button>
        </md-table-empty-state>

        <md-table-row 
            slot="md-table-row" 
            slot-scope="{ item }" 
            md-selectable="multiple" 
            @click="showDetail(item)"
            :md-disabled="item.enrolments.length > 0"
        >
            <md-table-cell md-label="Name" md-sort-by="name">{{ item.name }}</md-table-cell>
            <md-table-cell md-label="Email" md-sort-by="email">{{ item.email }}</md-table-cell>
            <md-table-cell md-label="Enrolments" md-sort-by="enrolments.length">{{ item.enrolments ? item.enrolments.length : 0 }}</md-table-cell>
        </md-table-row>
        </md-table>
        <error-state v-else :error="error" />
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
        name: 'lecturers',
        data: () => ({
            search: null,
            searched: [],
            selected: [],
            deletingMessage: null,
            deleting: false
        }),
        methods: {
            searchOnTable () {
                this.searched = searchByName(this.lecturers, this.search)
            },
            onSelect (item) {
                this.selected = item
            },
            showDetail (item) {
                this.$router.replace({
                    path: `/lecturer/show/${item.id}`
                })
            },
            async bulkDelete() {
                let app = this

                app.deletingMessage = `Bulk deleting ${app.selected.length} item${app.selected.length > 1 ? "s" : ""}`
                app.deleting = true
                try {
                    const res = await app.bulkDeleteLecturer(app.selected)
                   
                    app.deletingMessage = `Bulk delete successful: ${res.deletes} deletes`
                    app.searched = app.lecturers
                } catch(err) {
                    app.deletingMessage = `Bulk delete error: ${err.deletes} deletes, ${err.errors} errors`
                    app.searched = app.lecturers
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

                return `${count} lecturer${plural} selected`
            },
            ...mapActions({
                bulkDeleteLecturer: 'lecturer/bulkDeleteLecturer'
            })
        },
        created() {
            if(this.lecturers.length < 1) {
                this.$store.dispatch('lecturer/loadLecturers').then(() => {
                    this.searched = this.lecturers
                })
            } else this.searched = this.lecturers
        },
        components: {
            LoadingIndicator,
            ErrorState
        },
        computed: {
            ...mapGetters({
                lecturers: 'lecturer/lecturers',
                loading: 'lecturer/loading',
                error: 'lecturer/error'
            })
        }
    }
</script>

<style lang="scss">
    .index-container {
                max-width: 90%;
    }
    @media(min-width: 600px) {
        .index-container {
                width: 90%;
        }
    }
    .md-table-row {
        cursor: pointer;
    }
</style>