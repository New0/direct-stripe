import Vue from 'vue'
import App from './App.vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

Vue.use(Vuetify)

var dsAdminApp = new Vue({
  el: '#ds-admin-app',
  render: h => h(App)
})
