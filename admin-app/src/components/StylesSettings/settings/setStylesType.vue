<template>
    <div>

        <div>
            <v-layout row>
                <v-flex xs12>
                    <h3>{{text.customButtonStyles}}</h3>
                </v-flex>
            </v-layout>

    </div>
</template>

<script>
  import axios from 'axios';

  const SETTINGS = ds_admin_app_vars.api.settings;
  const strings = ds_admin_app_vars.strings;

  export default {
    name: 'setStyleType',
    data () {
      return {
        allData: '',
        text: strings,
        testMode: false
      }
    },
    mounted () {
      axios
        .get(SETTINGS)
        .then(response => {
          this.allData = response.data;

          if( response.data.direct_stripe_checkbox_api_keys === 'false' ) {
            this.testMode = false;
          } else if ( response.data.direct_stripe_checkbox_api_keys === 'true' ) {
            this.testMode = true;
          }

        })
        .catch(error => console.log(error))
    },
    methods: {
      saveSetting: function (message, event) {

        let el = jQuery('#save-result');

        function bubble(){
          el[0].classList.add('active')
          setTimeout(() => {
            el[0].classList.remove('active')
          }, 3000)
        }

        const req_url = SETTINGS + '?' + message + '=' + event;

        axios
          .post(req_url)
          .then(response => {
            console.log(response);
            bubble()
          })
          .catch(error => console.log(error))
      }
    }
  }
</script>

<style scoped>

</style>