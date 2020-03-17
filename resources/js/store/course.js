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

        PUSH_COURSE(state, course) {
            state.courses.push(course)
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
         * @param {commit} commit  
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
         * @param {id} id 
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
         * @param {commit} commit 
         * @param {course} course 
         */
        async addCourse({commit}, course) {
            commit('SET_LOADING', true)
            try {
                let response = await axios.post('/api/courses', course) 

                commit('SET_COURSE', response.data.data)
                commit('PUSH_COURSE', response.data.data)
                commit('SET_LOADING', false)

                return response.data.data.id
            } catch(error) {
                console.log('Error addCourse', error);
                commit('SET_ERROR', error) 
                commit('SET_LOADING', false)
                throw error
            }
        },
        /**
         * Update a course in the 
         * database
         * 
         * @param {commit} commit 
         * @param {param0} id 
         * @param {param1} courseBody
         */
        async updateCourse({commit}, param) {
            commit('SET_LOADING', true)
            try {
                let response = await axios.put('/api/courses/' + param[0], param[1]) 
                
                commit('SET_COURSE', response.data.data)
                commit('SET_LOADING', false)

                return response.data.data.id
            } catch(error) {
                console.log('Error updateCourse', error);
                commit('SET_ERROR', error) 
                commit('SET_LOADING', false)
                throw error
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
            try {
                let response = await axios.delete('/api/courses/' + id) 
                
                commit('REMOVE_COURSE', id)
                commit('SET_COURSE', null)
            } catch(error) {
                console.log('Error deleteCourse', null);
                throw error
            }
        }
    }
}