import Vue from 'vue'
import Vuex from 'vuex'
import { apolloClient } from 'api/apollo'

import CATEGORIES_QUERY from 'graphql/ModuleCategories.gql'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    categoryId: null,
    categories: [],
    categoriesReady: false,
    releaseId: null,
    releasesReady: false,
  },

  getters: {
    'categoryId': state => state.categoryId,
    'categories': state => state.categories,
    'categoriesReady': state => state.categoriesReady,

    'releaseId': state => state.releaseId,
    'releases': state => state.releases,
    'releasesReady': state => state.releasesReady,
  },

  mutations: {
    'set_category': (state, categoryId) => {
      state.categoryId = categoryId
    },

    'set_categories': (state, categories) => {
      state.categories = categories.slice().sort((a, b) => a.label < b.label ? -1 : 1)
      state.categoriesReady = true
    },

    'set_release': (state, releaseId) => {
      state.releaseId = releaseId
    },

    'set_releases': (state, releases) => {
      state.releases = releases
      state.releasesReady = true
    },
  },

  actions: {
    'init' ({ dispatch }) {
      return Promise.all([
        dispatch('fetch_categories'),
      ])
    },

    'fetch_categories' ({ commit }) {
      apolloClient.query({
        query: CATEGORIES_QUERY,
      }).then(result => {
        commit('set_categories', result.data.module_categories)
      })
    },
  },
})

export default store
