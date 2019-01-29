import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

let store = new Vuex.Store({
    state: {
        infoItem: null,
        prevPage: null,
        isExpired: null,
        loginbean: null
    },
    getters: {
        getInfoItem(state) {
            return state.infoItem
        },
        getPage(state) {
            return state.prevPage
        },
        getIsExpired(state) {
            return state.isExpired
        },
        getbean(state) {
            return state.loginbean
        }
    },
    mutations: {
        setInfoItem(state, data) {
            state.infoItem = data;
        },
        setPage(state, data) {
            state.prevPage = data;
        },
        setIsExpired(state, data) {
            state.isExpired = data;
        },
        setbean(state, data) {
            state.loginbean = data;
        }
    }
})


export default store