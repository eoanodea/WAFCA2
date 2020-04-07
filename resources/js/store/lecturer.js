import axios from 'axios'

export default {
    namespaced: true,

    state: {
        lecturers: [],
        lecturer: null,
        loading: true,
        error: null
    },

    getters: {
        lecturers(state) {
            return state.lecturers
        },

        lecturer(state) {
            return state.lecturer
        },

        loading(state) {
            return state.loading
        },

        error(state) {
            return state.error
        },
    },

    mutations: {
        SET_LECTURERS(state, lecturers) {
            state.lecturers = lecturers
        },

        SET_LECTURER(state, lecturer) {
            state.lecturer = lecturer
        },

        PUSH_LECTURER(state, lecturer) {
            let newLecturer = lecturer
            newLecturer.enrolments = []

            state.lecturers.push(newLecturer)
        },

        REMOVE_LECTURER(state, id) {
            state.lecturers = state.lecturers.filter(dat => dat.id !== id)
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
         * server for a list of lecturers
         * 
         * @param {commit} commit  
         */
        async loadLecturers({commit}) {
            commit('SET_LOADING', true)
            commit('SET_ERROR', null)
            
            try {
                let response = await axios.get('/api/lecturers') 

                commit('SET_LECTURERS', response.data.data)
                commit('SET_LOADING', false)
            } catch (error) {
                console.log('Error loadLecturers!', error)
                commit('SET_ERROR', error) 
                commit('SET_LOADING', false)
            }
        },
        /**
         * Makes an API request to the 
         * server for a single lecturer
         * 
         * @param {commit} param0 
         * @param {id} id 
         */
        async loadLecturer({commit}, id) {
            commit('SET_LOADING', true)
            commit('SET_ERROR', null)

            if(id) {
                try {
                    let response = await axios.get('/api/lecturers/' + id) 
                    
                    commit('SET_LECTURER', response.data.data)
                    commit('SET_LOADING', false)
                } catch(error) {
                    console.log('Error getLecturer', error);
                    commit('SET_ERROR', error) 
                    commit('SET_LOADING', false)
                    throw error
                }
            } else {
                commit('SET_LECTURER', null)
                commit('SET_LOADING', false)
            }
        },
        /**
         * Create a new lecturer
         * 
         * @param {commit} commit 
         * @param {lecturer} lecturer 
         */
        async addLecturer({commit}, lecturer) {
            commit('SET_LOADING', true)
            commit('SET_ERROR', null)

            try {
                let response = await axios.post('/api/lecturers', lecturer) 

                commit('SET_LECTURER', response.data.data)
                commit('PUSH_LECTURER', response.data.data)
                commit('SET_LOADING', false)

                return response.data.data.id
            } catch(error) {
                console.log('Error addLecturer', error);
                commit('SET_ERROR', error) 
                commit('SET_LOADING', false)
                throw error
            }
        },
        /**
         * Update a lecturer in the 
         * database
         * 
         * @param {commit} commit 
         * @param {param0} id 
         * @param {param1} lecturerBody
         */
        async updateLecturer({commit}, param) {
            commit('SET_LOADING', true)
            commit('SET_ERROR', null)

            try {
                let response = await axios.put('/api/lecturers/' + param[0], param[1]) 
                
                commit('SET_LECTURER', response.data.data)
                commit('SET_LOADING', false)

                return response.data.data.id
            } catch(error) {
                console.log('Error updateLecturer', error);
                commit('SET_ERROR', error) 
                commit('SET_LOADING', false)
                throw error
            }
        },
        /**
         * Delete a lecturer 
         * from the database
         * 
         * @param {commit} commit
         * @param {id} id
         */
        async deleteLecturer({commit}, id) {
            commit('SET_ERROR', null)

            try {
                let response = await axios.delete('/api/lecturers/' + id) 
                
                commit('REMOVE_LECTURER', id)
                commit('SET_LECTURER', null)


                return response.data
            } catch(error) {
                console.log('Error deleteLecturer', error);
                commit('SET_ERROR', error) 
                throw error
            }
        },
        /**
         * Delete a set of lecturers
         * Takes in an array of IDs
         * 
         * @param {commit} commit
         * @param {ids} ids 
         */
        bulkDeleteLecturer({commit, dispatch}, ids) {
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
                             * Run the delete lecturer function on an ID and await it's result
                             */
                            const res = await dispatch('deleteLecturer', dat.id)

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