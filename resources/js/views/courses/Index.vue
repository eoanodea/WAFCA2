<template>
    <loading-indicator v-if="loading" />
    <md-table v-else v-model="searched" md-sort="name" md-sort-order="asc" md-card md-fixed-header>
      <md-table-toolbar>
        <div class="md-toolbar-section-start">
          <h1 class="md-title">Courses</h1>
        </div>

        <md-field md-clearable class="md-toolbar-section-end">
          <md-input placeholder="Search by name..." v-model="search" @input="searchOnTable" />
        </md-field>
      </md-table-toolbar>

      <md-table-empty-state
        md-label="No courses found"
        :md-description="`No courses found for this search query. Try a different search term or create a new course.`">
        <md-button class="md-primary md-raised">Create New Course</md-button>
      </md-table-empty-state>

      <md-table-row slot="md-table-row" slot-scope="{ item }">
        <md-table-cell md-label="ID" md-sort-by="id" md-numeric>{{ item.id }}</md-table-cell>
        <md-table-cell md-label="Title" md-sort-by="title">{{ item.title }}</md-table-cell>

      </md-table-row>
    </md-table>
</template>

<script>
    import Vue from 'vue'
    import {MdTable, MdContent, MdRipple}  from 'vue-material/dist/components'
    import { mapGetters } from 'vuex'
    import LoadingIndicator from './../../components/LoadingIndicator'

    Vue.use(MdTable)
    Vue.use(MdContent)
    Vue.use(MdRipple)

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
            searched: []
        }),
        methods: {
            searchOnTable () {
                this.searched = searchByName(this.courses, this.search)
            }
        },
        created() {
            if(this.courses.length < 1) {
                this.$store.dispatch('course/loadCourses').then(() => {
                    this.searched = this.courses
                })
            }
        },
        components: {
            LoadingIndicator
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