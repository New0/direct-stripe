<template>
    <div>

        <v-layout row>

            <v-flex md2>
                <h3>{{text.mainColor}}</h3>
            </v-flex>

            <v-flex md4>

                <input
                        v-on:change="saveSetting('direct_stripe_main_color_style', $event)"
                        class='direct-stripe-color-field'
                        v-model="color"
                        type="text"
                        :value="color"
                />

            </v-flex>

        </v-layout>

    </div>
</template>

<script>
  import axios from 'axios';

  const SETTINGS = ds_admin_app_vars.api.settings;
  const strings = ds_admin_app_vars.strings;

  /**
   * Insert WordPress colorPicker
   */
  (function( $ ) {
    $(function() {

      $( '.direct-stripe-color-field' ).wpColorPicker();

      $('wp-color-result').on( 'change', function() {
        let el = jQuery('#save-result');

        function bubble(){
          el[0].classList.add('active')
          setTimeout(() => {
            el[0].classList.remove('active')
          }, 3000)
        }

        const req_url = SETTINGS + '?' + message + '=' + event + '&_dsnonce=' + nonce;

        axios
          .post(req_url)
          .then(response => {
            if( typeof response.data === "undefined" || response.data === null ) {
              bubble()
            } else {
              if (response.data.error === true ){
                console.log( response.data.text );
              }
            }
          })
          .catch(error => console.log(error))

      });

    });
  })( jQuery );

  export default {
    name: 'colorPicker',
    data () {
      return {
        text: strings,
        color: ''
      }
    },
    mounted () {
      axios
        .get(SETTINGS)
        .then(response => {
          console.log( response.data.direct_stripe_main_color_style );
          this.color = response.data.direct_stripe_main_color_style;
        })
        .catch(error => console.log(error))
    }
  }
</script>

<style scoped>

</style>