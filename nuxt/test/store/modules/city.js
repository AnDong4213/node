const state = () => ({
  list: ['a', 'b']
})

const mutations = {
  add(state, text) {
    state.list.push(text)
  }
}

const actions = {
  add({commit}, text) {
    commit('add', texr)
  }
}

// vuex中的store分模块管理，需要在store的index.js中引入各个模块，为了解决不同模块命名冲突的问题，将不同模块的namespaced:true，之后在不同页面中引入getter、actions、mutations时，需要加上所属的模块名
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
