<template>
    <div>
        <hr />

        <v-layout row wrap>

            <v-flex md2 xs12>
                <label for="mainColor">{{text.mainColor}}</label>
            </v-flex>

            <v-flex md4 xs12>

                <div class="ds-show-color"><span v-bind:style="{ backgroundColor: dscolor, width: '5rem', height: '2rem' }"></span></div>

                <input
                        class='direct-stripe-color-field'
                        type="text"
                        id="mainColor"
                />

            </v-flex>

        </v-layout>

    </div>
</template>

<script>
  import axios from 'axios';

  const SETTINGS = ds_admin_app_vars.api.settings;
  const strings = ds_admin_app_vars.strings;
  const nonce = ds_admin_app_vars.api.nonce;

  export default {
    name: 'colorPicker',
    data () {
      return {
        text: strings,
      }
    },
    mounted () {
      axios
        .get(SETTINGS)
        .then(response => {
          this.dscolor = '#' + response.data.direct_stripe_main_color_style;
          jQuery( '.direct-stripe-color-field' ).wpColorPicker().iris('color', this.dscolor)
        })
        .catch(error => console.log(error))

      let dsOptions = {
        color: this.dscolor,
        change: function(event, ui){

          const newColor = ui.color.toString().substring(1);

          this.dscolor = '#' + newColor;

          let el = jQuery('#save-result');

          function bubble(){
            el[0].classList.add('active')
            setTimeout(() => {
              el[0].classList.remove('active')
            }, 3000)
          }

          const req_url = SETTINGS + '?direct_stripe_main_color_style=' + newColor + '&_dsnonce=' + nonce;
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

        },
      };
      jQuery( '.direct-stripe-color-field' ).wpColorPicker( dsOptions );

    }
  }
</script>

<style>

    .ds-show-color {
        width: 3rem;
        height: 1rem;
        display: block;
        position: relative;
    }

</style>