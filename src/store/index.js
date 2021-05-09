import Vue from "vue";
import Vuex from 'vuex'
import * as app from './modules/app'


Vue.use(Vuex);



export default new Vuex.Store({
  modules: {
    app,
  },
});

// import Vue from 'vue'
// import Vuex from 'vuex'


// Vue.use(Vuex)

// export default new Vuex.Store({
//   state: {
//   },
//   mutations: {
//   },
//   actions: {
//   },
//   modules: {
//   }
// })
