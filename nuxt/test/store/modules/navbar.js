const state = () => ({
  app: []
})

const mutations = {
  add(state, text) {
    state.app.push(text)
  }
}

const actions = {
  add({commit}, text) {
    commit('add', texr)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
