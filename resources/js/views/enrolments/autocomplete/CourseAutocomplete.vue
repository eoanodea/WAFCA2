<template>
     <md-autocomplete 
        v-model="selectedCourse" 
        :md-options="filteredCourses" 
        @md-changed="getCourses" 
        @md-opened="getCourses"
        @md-selected="selectCourse"
    >
        <label>Courses</label>
        <template slot="md-autocomplete-item" slot-scope="{ item }">
            <md-highlight-text :md-term="item.id.toString()">{{ item.title }}</md-highlight-text>
            </template>
        <template slot="md-autocomplete-empty" slot-scope="{ term }">
            No courses matching "{{ term }}" were found. <br />
            <md-button class="md-primary md-raised" to="/course/new">Create New Course</md-button>
        </template>
    </md-autocomplete>
</template>

<script>
    import Vue from 'vue'
    //Vue Material
    import {
        MdAutocomplete,
        MdMenu,
        MdHighlightText
    } from 'vue-material/dist/components'
    //VueX
    import { mapGetters } from 'vuex'

    Vue.use(MdAutocomplete)
    Vue.use(MdHighlightText)
    Vue.use(MdMenu)


    export default {
        data: () => ({
            selectedCourse: null,
            filteredCourses: [],
        }),
        methods: {
            selectCourse() {
                const {selectedCourse} = this
                this.selectedCourse = selectedCourse.title
                this.$emit('item-selected', selectedCourse.id, 'course_id')
            },

            getCourses(searchTerm) {
                this.filteredCourses = new Promise(resolve => {
                    window.setTimeout(() => {
                        if(this.courses.length < 1) {
                            this.$store.dispatch('course/loadCourses').then(() => {
                                if (!searchTerm) return resolve(this.courses)
                                
                                const term = searchTerm.toLowerCase()
                                resolve(this.courses.filter(({ title }) => title.toLowerCase().includes(term)))
                            })
                        } else {
                            if (!searchTerm) return resolve(this.courses)
                            
                            const term = searchTerm.toLowerCase()
                            resolve(this.courses.filter(({ title }) => title.toLowerCase().includes(term)))
                        }
                    }, 500)
                })
            },
        },
        computed: {
            ...mapGetters({
                courses: 'course/courses',
                courseLoading: 'course/loading',
                courseError: 'course/error',
            })
        }
    }
</script>