import axios from 'axios'

export default {
    namespaced: true,

    state: {
        enrolments: [],
        enrolment: null,
        loading: true,
        error: null
    },

    getters: {
        enrolments(state) {
            return state.enrolments
        },

        enrolment(state) {
            return state.enrolment
        },

        loading(state) {
            return state.loading
        },

        error(state) {
            return state.error
        },
    },

    mutations: {
        SET_ENROLMENTS(state, enrolments) {
            state.enrolments = enrolments
        },

        SET_ENROLMENT(state, enrolment) {
            state.enrolment = enrolment
        },

        PUSH_ENROLMENT(state, enrolment) {
            let newEnrolment = enrolment
            newEnrolment.enrolments = []

            state.enrolments.push(newEnrolment)
        },

        REMOVE_ENROLMENT(state, id) {
            state.enrolments = state.enrolments.filter(dat => dat.id !== id)
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
         * server for a list of enrolments
         * 
         * @param {commit} commit  
         */
        async loadEnrolments({commit}) {
            commit('SET_LOADING', true)
            
            try {
                let response = await axios.get('/api/enrolments') 

                commit('SET_ENROLMENTS', response.data.data)
                commit('SET_LOADING', false)
            } catch (error) {
                console.log('Error loadEnrolments!', error)
                commit('SET_ERROR', error) 
                commit('SET_LOADING', false)
            }
        },
        /**
         * Makes an API request to the 
         * server for a single enrolment
         * 
         * @param {commit} param0 
         * @param {id} id 
         */
        async loadEnrolment({commit}, id) {
            commit('SET_LOADING', true)
            if(id) {
                try {
                    let response = await axios.get('/api/enrolments/' + id) 
                    
                    commit('SET_ENROLMENT', response.data.data)
                    commit('SET_LOADING', false)
                } catch(error) {
                    console.log('Error getEnrolment', error);
                    commit('SET_ERROR', error) 
                    commit('SET_LOADING', false)
                    throw error
                }
            } else {
                commit('SET_ENROLMENT', null)
                commit('SET_LOADING', false)
            }
        },
        /**
         * Create a new enrolment
         * 
         * @param {commit} commit 
         * @param {enrolment} enrolment 
         */
        async addEnrolment({commit}, enrolment) {
            commit('SET_LOADING', true)
            try {
                let response = await axios.post('/api/enrolments', enrolment) 

                commit('SET_ENROLMENT', response.data.data)
                commit('PUSH_ENROLMENT', response.data.data)
                commit('SET_LOADING', false)

                return response.data.data.id
            } catch(error) {
                console.log('Error addEnrolment', error);
                commit('SET_ERROR', error) 
                commit('SET_LOADING', false)
                throw error
            }
        },
        /**
         * Update a enrolment in the 
         * database
         * 
         * @param {commit} commit 
         * @param {param0} id 
         * @param {param1} enrolmentBody
         */
        async updateEnrolment({commit}, param) {
            commit('SET_LOADING', true)
            try {
                let response = await axios.put('/api/enrolments/' + param[0], param[1]) 
                
                commit('SET_ENROLMENT', response.data.data)
                commit('SET_LOADING', false)

                return response.data.data.id
            } catch(error) {
                console.log('Error updateEnrolment', error);
                commit('SET_ERROR', error) 
                commit('SET_LOADING', false)
                throw error
            }
        },
        /**
         * Delete a enrolment 
         * from the database
         * 
         * @param {commit} commit
         * @param {id} id
         */
        async deleteEnrolment({commit}, id) {
            try {
                let response = await axios.delete('/api/enrolments/' + id) 
                
                commit('REMOVE_ENROLMENT', id)
                commit('SET_ENROLMENT', null)

                return response.data
            } catch(error) {
                console.log('Error deleteEnrolment', null);
                throw error
            }
        },
        /**
         * Delete a set of enrolments
         * Takes in an array of IDs
         * 
         * @param {commit} commit
         * @param {ids} ids 
         */
        bulkDeleteEnrolment({commit, dispatch}, ids) {
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
                             * Run the delete enrolment function on an ID and await it's result
                             */
                            const res = await dispatch('deleteEnrolment', dat.id)

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