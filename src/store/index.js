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
    },
    changeStatus(state, task) {
      state.tasks.forEach(t => {
        if (t.id === task.id) {
          switch (t.status) {
            case 1:
              t.status = 3
              break;
            case 2:
              t.status = 1
              break;
          }
        }
      })
    },
    revertStatus(state, task) {
      state.tasks.forEach(t => {
        if (t.id === task.id) {
          switch (t.status) {
            case 3:
              t.status = 1
              break;
            case 1:
              t.status = 2
              break;
          }
        }
      })
    },
    deleteTask(state, task) {
      state.tasks = state.tasks.filter(t => t.id !== task.id)
    }
  },
  actions: {
    addTask({ commit }, task) {
      commit('addTask', task)
    },
    editTask({ commit }, task) {
      commit('editTask', task)
    },
    changeStatus({ commit }, task) {
      commit('changeStatus', task)
    },
    revertStatus({ commit }, task) {
      commit('revertStatus', task)
    },
    deleteTask({ commit }, task) {
      commit('deleteTask', task)
    }
  },
  modules: {
  }
})
