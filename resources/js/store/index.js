import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth'
import course from './course'
import lecturer from './lecturer'
import enrolment from './enrolment'


Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        //
    },

    mutations: {
        //
    },

    actions: {
        //
    },

    modules: {
        auth,
        course,
        lecturer,
        enrolment
    }
})