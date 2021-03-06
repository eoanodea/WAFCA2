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
            let newCourse = course
            newCourse.enrolments = []

            state.courses.push(newCourse)
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
            commit('SET_ERROR', null)
            
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
            commit('SET_ERROR', null)

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
            commit('SET_ERROR', null)

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
            commit('SET_ERROR', null)

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
         * @param {commit} commit
         * @param {id} id
         */
        async deleteCourse({commit}, id) {
            commit('SET_LOADING', true)
            commit('SET_ERROR', null)

            try {
                let response = await axios.delete('/api/courses/' + id) 
                
                commit('REMOVE_COURSE', id)
                commit('SET_COURSE', null)

                return response.data
            } catch(error) {
                console.log('Error deleteCourse', error);
                commit('SET_ERROR', error) 

                throw error
            }
        },
        /**
         * Delete a set of courses
         * Takes in an array of IDs
         * 
         * @param {commit} commit
         * @param {ids} ids 
         */
        bulkDeleteCourse({commit, dispatch}, ids) {
            return new Promise(async function(resolve, reject) {
                /**
                 * Only run if the IDs array length is greater than 0
                 */
                if(ids.length > 0) {
                    let errors = 0, deletes = 0, lengthOfIds = ids.length
                    console.log('Commencing bulk delete', ids.length)
                    /**
                     * Map through the IDs array asynchronously 
                     */
                    ids.map(async (dat, i) => {
                        console.log(`[${i}] Deleting..`)
                        try {
                            /**
                             * Run the delete course function on an ID and await it's result
                             */
                            const res = await dispatch('deleteCourse', dat.id)

                            console.log(`[${i}] Deleting Successful: ${res.status}`)
                            /**
                             * Increment the deletes variable
                             */
                            deletes++;
                            
                            /**
                             * If ID is the last ID in the array, respond with a delete summary
                             * and log it to the console
                             */
                            if(i == (lengthOfIds -1)) {
                                console.log(`[${i}] Final Delete ${lengthOfIds} `)
                                console.log('Bulk delete completed: \n', `${deletes} deletes \n ${errors} errors`)
                                const response = {
                                    deletes,
                                    errors
                                }

                                if(errors > 0) return reject(response)
                                return resolve(response)
                            }
                        /**
                         * Catch any errors and log them to the console
                         */
                        } catch(err) {
                            errors++;    
                            console.log(`[${i}] Error deleting: ${err}`)
                        }
                    })
                } else return reject({deletes: 0, errors: ids.length})
            })
        }
    }
}