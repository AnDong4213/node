import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

let store = new Vuex.Store({
    state: {
        loginbean: null
    },
    getters: {
        logInfoBean(state) {
            return state.loginbean
        }
    },
    mutations: {
        onZhuce(state, data) {
            
        },
        onLogin(state, data) {
            console.log(data.nicheng)
            state.loginbean = data;
        }
    },
    actions: {

    }
})


export default store