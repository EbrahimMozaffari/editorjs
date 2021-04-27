import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

 import Editor from 'vue-editor-js/src'
// import Editor from '@editorjs/editorjs';
Vue.use(Editor);


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
