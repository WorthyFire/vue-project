import { createStore } from 'vuex'

export default createStore({
  state: {

  },
  getters: {
    getToken() {
      const token = localStorage.getItem('userToken');
      return token;
    }
  },
  mutations: {
  },
  actions: {

  },
  modules: {
  }
})