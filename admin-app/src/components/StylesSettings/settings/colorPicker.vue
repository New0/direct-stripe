<template>
    <div>
        <hr />

        <v-layout row>

            <v-flex md2>
                <h3>{{text.mainColor}}</h3>
            </v-flex>

            <v-flex md4>

                <input class="ds-show-color" v-bind:style="{ backgroundColor: dscolor }" />

                <input
                        class='direct-stripe-color-field'
                        type="text"
                        v-model="dscolor"
                        :value="dscolor"
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
        width: 2rem;
    }

    .wp-picker-container .wp-color-result.button {
        padding-left: 0 !important;
    }

</style>