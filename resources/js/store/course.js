import axios from 'axios'

export default {
    namespaced: true,

    state: {
        courses: [],
        course: null,
        loading: true,
        error: null
    },

    getters: {
        courses(state) {
            return state.courses
        },

        course(state) {
            return state.course
        },

        loading(state) {
            return state.loading
        },

        error(state) {
            return state.error
        },
    },

    mutations: {
        SET_COURSES(state, courses) {
            state.courses = courses
        },

        SET_COURSE(state, course) {
            state.course = course
        },

        REMOVE_COURSE(state, id) {
            state.courses = state.courses.filter(dat => dat.id !== id)
        },

        SET_LOADING(state, loading) {
            if(loading == true) this.error = null
            state.loading = loading
        },

        SET_ERROR(state, error) {
            state.user = null
            state.error = error
        },

    },

    actions: {
        /**
         * Makes an API request to the 
         * server for a list of courses
         * 
         * @param {commit} param0 
         * @param {page} page 
         */
        async loadCourses({commit}) {
            commit('SET_LOADING', true)
            
            try {
                let response = await axios.get('/api/courses') 

                commit('SET_COURSES', response.data.data)
                commit('SET_LOADING', false)
            } catch (error) {
                console.log('Error loadCourses!', error)
                commit('SET_ERROR', error) 
                commit('SET_LOADING', false)
            }
        },
        /**
         * Makes an API request to the 
         * server for a single course
         * 
         * @param {commit} param0 
         * @param {page} page 
         */
        async loadCourse({commit}, id) {
            commit('SET_LOADING', true)
            if(id) {
                try {
                    let response = await axios.get('/api/courses/' + id) 
                    
                    commit('SET_COURSE', response.data.data)
                    commit('SET_LOADING', false)
                } catch(error) {
                    console.log('Error getCourse', error);
                    commit('SET_ERROR', error) 
                    commit('SET_LOADING', false)
                    throw error
                }
            } else {
                commit('SET_COURSE', null)
                commit('SET_LOADING', false)
            }
        },
        /**
         * Create a new course
         * 
         * @param {commit} param0 
         * @param {page} page 
         */
        async addCourse({commit}, course) {
            commit('SET_LOADING', true)
            try {
                
                let response = await axios.post('/api/course/new', course) 
                commit('SET_COURSE', response.data.data)
                commit('SET_LOADING', false)
                return response.data.course.id
            } catch(error) {
                console.log('Error getCourse', error);
                commit('SET_ERROR', error) 
                commit('SET_LOADING', false)
            }
        },
        /**
         * Makes an API request to the 
         * server for a single course
         * 
         * @param {commit} param0 
         * @param {page} page 
         */
        async updateCourse({commit}, param) {
            commit('SET_LOADING', true)
            try {
                let response = await axios.put('/api/course/' + param[0], param[1]) 
                
                commit('SET_COURSE', response.data.data)
                commit('SET_LOADING', false)
                return response.data.course.id
            } catch(error) {
                console.log('Error getCourse', error);
                commit('SET_ERROR', error) 
                commit('SET_LOADING', false)
            }
        },
        /**
         * Delete a course 
         * from the database
         * 
         * @param {commit} param
         * @param {page} page 
         */
        async deleteCourse({commit}, id) {
            commit('SET_LOADING', true)
            try {
                let response = await axios.delete('/api/course/' + id) 
                if(response.status === 'success') {
                    console.log('response good!')
                    this.loadCourses({commit})
                }
                commit('SET_COURSE', null)
                commit('SET_LOADING', false)
            } catch(error) {
                console.log('Error getCourse', null);
                commit('SET_ERROR', error) 
                commit('SET_LOADING', false)
            }
        }
    }
}