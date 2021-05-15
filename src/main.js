import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VuePlyr from 'vue-plyr'
import 'vue-plyr/dist/vue-plyr.css'

import Bootstrap from 'bootstrap'
import Jquery from 'jquery'

import 'bootstrap/dist/css/bootstrap.min.css'

import Editor from 'vue-editor-js/src'
import vuetify from './plugins/vuetify'
import axios from "axios"
import VueClipboard from 'vue-clipboard2'
VueClipboard.config.autoSetContainer = true
Vue.use(VueClipboard)
Vue.use(VuePlyr, {
  plyr: {}
})

window.axios = axios;

// import Editor from '@editorjs/editorjs';
Vue.use(Editor);
// Vue.use(Bootstrap);
window.$ = Jquery;
Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
