import Vue from 'vue'
import Vuex from 'vuex'
// import json file from assets
import tasks from '@/assets/tasks.json'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    tasks: tasks,
  },
  getters: {
    tasks: state => state.tasks,
    finished_tasks: state => state.tasks.filter(t => t.status === 1).length,
    todays_tasks: state => state.tasks.filter(t => t.end_date === new Date().toISOString().substr(0, 10) && t.status === 2).slice(0, 3),
  },
  mutations: {
    addTask(state, task) {
      state.tasks.push(task)
    },
    editTask(state, task) {
      state.tasks = state.tasks.map(t => {
        if (t.id === task.id) {
          return task
        }
        return t
      })
    }
  },
  actions: {
    addTask({ commit }, task) {
      commit('addTask', task)
    },
    editTask({ commit }, task) {
      commit('editTask', task)
    }
  },
  modules: {
  }
})
