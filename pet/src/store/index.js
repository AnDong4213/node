import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

let store = new Vuex.Store({
    state: {
        infoItem: null,
        prevPage: null,
        isExpired: null
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
        }
    },
    actions: {

    }
})


export default store