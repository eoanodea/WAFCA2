
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
            }
        },
        SET_USER (state, data) {
            state.user.name = data.name
            state.user.email = data.email
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

        async attempt ({ commit }, data) {
            if(data.token) {
                commit('SET_TOKEN', data.token)
                commit('SET_USER', {name: data.name, email: data.email})
            } else {
                commit('SET_TOKEN', null)
                commit('SET_USER', null)
            }
        
        },

        async attemptToken ({ commit }, data) {
            if(data !== null) {
                commit('SET_TOKEN', data)
            } else {
                commit('SET_TOKEN', null)
            }
        },

        signOut ({ commit }) {
            return axios.post('/api/auth/logout').then(() => {
                commit('SET_TOKEN', null)
                commit('SET_USER', null)
            })
        }
    },
}