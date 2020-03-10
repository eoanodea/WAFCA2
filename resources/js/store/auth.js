
import axios from 'axios'

export default {
    namespaced: true,

    state: {
        token: null,
        user: {
            name: null,
            email: null
        }
    },

    getters: {
        authenticated (state) {
            return state.token
        },

        user (state) {
            return state.user
        },

        token (state) {
            return state.token ? `${state.token_type && state.token}` : false
        }
    },

    mutations: {
        SET_TOKEN (state, token) {
            if(!token) {
                state.token = null
                window.axios.defaults.headers.common['Authorization'] = ''
            } else {
                state.token = token
                window.axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
                window.axios.defaults.headers.common['Accept'] = `application/json`
            }
        },
        SET_USER (state, data) {
            if(data) {
                state.user.name = data.name
                state.user.email = data.email
            } else {
                state.user.name = null
                state.user.email = null
            }
        }
    },

    actions: {
        async signIn({ dispatch }, credentials) {
            try {
                let response = await axios.post('/api/login', credentials)
                
                dispatch('attempt', response.data)
            } catch(error) {
                console.log("error store", error)
                throw error
            }
        },

        async verifyToken({ dispatch }, token) {
            try {
                const response = await axios.get('/api/user')
                const payload = 
                {
                    name: response.data.user.name,
                    email: response.data.user.email,
                    token: token
                }


                dispatch('attempt', payload)
            } catch(error) {
                console.log("error verifying", error)
                dispatch('attempt', null)
            }
        },

        async attempt ({ commit }, data) {
            if(data && data.token) {
                commit('SET_TOKEN', data.token)
                commit('SET_USER', {name: data.name, email: data.email})
            } else {
                commit('SET_TOKEN', null)
                commit('SET_USER', null)
            }
        
        },

        signOut ({ commit }) {
            return axios.get('/api/logout').then(() => {
                commit('SET_TOKEN', null)
                commit('SET_USER', null)
            })
        }
    },
}