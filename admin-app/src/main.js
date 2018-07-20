import '@babel/polyfill';
import Vue from 'vue';
//import './plugins/vuetify';
import dsAdmin from './App.vue';
import Vuetify from 'vuetify';
import axios from 'axios';
import 'vuetify/dist/vuetify.min.css';
//import 'material-design-icons-iconfont/dist/material-design-icons.css';

Vue.use(Vuetify, {
  theme: {
    primary: "#32373C",
  }
});

const SETTINGS = ds_admin_app_vars.api.settings;
const nonce = ds_admin_app_vars.api.nonce;

/**
 * Function to save settings
 */
Vue.mixin({
  methods: {
    saveSetting: function (message, event) {

      const el = jQuery('#save-result');
      const loadingEl = jQuery('#load-result');
      loadingEl.addClass('active');

      function bubble(){
        el.addClass('active')
        setTimeout( () => {
          el.removeClass('active')
        }, 3000 )
      }

      const req_url = SETTINGS + '?' + message + '=' + event + '&_dsnonce=' + nonce;

      axios
        .post(req_url)
        .then(response => {
          if( typeof response.data === "undefined" || response.data === null ) {
            loadingEl.removeClass('active');
            bubble();
          } else {
            if (response.data.error === true ){
              console.log( response.data.text );
            }
          }
        })
        .catch(error => {
          console.log(error);
          loadingEl[0].classList.remove('active');
        })
    }
  }
})

/**
 * Init App
 */
let dsAdminApp = new Vue({
  el: '#ds-admin-app',
  render: h => h(dsAdmin)
})
