<template>
     <md-autocomplete 
        v-model="selectedLecturer" 
        :md-options="filteredLecturers" 
        @md-changed="getLecturers" 
        @md-opened="getLecturers"
        @md-selected="selectLecturer"
    >
        <label>Lecturers</label>
        <template slot="md-autocomplete-item" slot-scope="{ item }">
            <md-highlight-text :md-term="item.id.toString()">{{ item.name }}</md-highlight-text>
            </template>
        <template slot="md-autocomplete-empty" slot-scope="{ term }">
            No lecturers matching "{{ term }}" were found. <br />
            <md-button class="md-primary md-raised" to="/lecturer/new">Create New Lecturer</md-button>
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
        props: ['edit'],
        data: () => ({
            selectedLecturer: null,
            filteredLecturers: [],
        }),
        mounted() {
            if(this.edit) this.selectedLecturer = this.edit.name
        },
        watch: {
            edit: function(newVal, oldVal) {
                if(this.selectedLecturer !== newVal.name) this.selectedLecturer = newVal.name
            }
        },
        methods: {
            selectLecturer() {
                const {selectedLecturer} = this
                this.selectedLecturer = selectedLecturer.name
                this.$emit('item-selected', selectedLecturer.id, 'lecturer_id')
            },
            getLecturers(searchTerm) {
                this.filteredLecturers = new Promise(resolve => {
                    window.setTimeout(() => {
                        if(this.lecturers.length < 1) {
                            this.$store.dispatch('lecturer/loadLecturers').then(() => {
                                if (!searchTerm) return resolve(this.lecturers)

                                const term = searchTerm.toLowerCase()
                                resolve(this.lecturers.filter(({ title }) => title.toLowerCase().includes(term)))
                            })
                        } else {
                            if (!searchTerm) return resolve(this.lecturers)
                            
                            const term = searchTerm.toLowerCase()
                            resolve(this.lecturers.filter(({ title }) => title.toLowerCase().includes(term)))
                        }
                    }, 500)
                })
            },
        },
        computed: {
            ...mapGetters({
                lecturers: 'lecturer/lecturers',
                lecturerLoading: 'lecturer/loading',
                lecturerError: 'lecturer/error',
            })
        }
    }
</script>