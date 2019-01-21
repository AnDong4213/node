import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

let store = new Vuex.Store({
    state: {
        loginBean: null
    },
    getters: {
        logInfoBean(state) {
            return state.loginBean
        }
    },
    mutations: {
        onZhuce(state, data) {
            
        },
        onLogin(state, data) {
            console.log(data.nicheng)
            state.loginBean = data;
        }
    },
    actions: {

    }
})


export default store