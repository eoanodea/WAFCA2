<template>
    <loading-indicator v-if="loading" />
    <md-table 
        v-else-if="!error && searched" 
        v-model="searched" 
        md-sort="name" 
        md-sort-order="asc" 
        md-card 
        md-fixed-header
        @md-selected="onSelect"
    >
      <md-table-toolbar>
        <div class="md-toolbar-row">
        <div class="md-toolbar-section-start">
          <h1 class="md-title">Courses</h1>
        </div>
        <div class="md-toolbar-section-end">
            <md-button class="md-fab md-primary" to="/course/new">
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

    <md-table-toolbar slot="md-table-alternate-header" class="md-primary" slot-scope="{ count }">
        <div class="md-toolbar-section-start">{{ getAlternateLabel(count) }}</div>

        <div class="md-toolbar-section-end">
          <md-button class="md-fab md-accent">
            <md-icon>delete</md-icon>
          </md-button>
        </div>
    </md-table-toolbar>

      <md-table-empty-state
        md-label="No courses found"
        :md-description="`No courses found for this search query. Try a different search term or create a new course.`">
        <md-button class="md-primary md-raised" to="/course/new">Create New Course</md-button>
      </md-table-empty-state>

      <md-table-row slot="md-table-row" slot-scope="{ item }" md-selectable="multiple" @click="showDetail(item)">
        <md-table-cell md-label="ID" md-sort-by="id" md-numeric>{{ item.id }}</md-table-cell>
        <md-table-cell md-label="Title" md-sort-by="title">{{ item.title }}</md-table-cell>
        <md-table-cell md-label="Points" md-sort-by="points">{{ item.points }}</md-table-cell>
        <md-table-cell md-label="Enrolments" md-sort-by="enrolments.length">{{ item.enrolments ? item.enrolments.length : 0 }}</md-table-cell>
      </md-table-row>
    </md-table>
    <error-state v-else :error="error" />
</template>

<script>
    import Vue from 'vue'
    import {MdTable, MdContent, MdRipple, MdCheckbox}  from 'vue-material/dist/components'
    import { mapGetters } from 'vuex'
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
        name: 'courses',
        data: () => ({
            search: null,
            searched: [],
            selected: []
        }),
        methods: {
            searchOnTable () {
                this.searched = searchByName(this.courses, this.search)
            },
            onSelect (item) {
                this.selected = item
            },
            showDetail (item) {
                this.$router.replace({
                    path: `/course/show/${item.id}`
                })
            },
            getAlternateLabel (count) {
                let plural = ''

                if (count > 1) {
                    plural = 's'
                }

                return `${count} course${plural} selected`
            }
        },
        created() {
            if(this.courses.length < 1) {
                this.$store.dispatch('course/loadCourses').then(() => {
                    this.searched = this.courses
                })
            } else this.searched = this.courses
        },
        components: {
            LoadingIndicator,
            ErrorState
        },
        computed: {
            ...mapGetters({
                courses: 'course/courses',
                loading: 'course/loading',
                error: 'course/error'
            })
        }
    }
</script>

<style lang="scss" scoped>
    .md-table-row {
        cursor: pointer;
    }
</style>