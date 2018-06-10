<template>
    <div>

        <v-layout row wrap>
            <v-flex xs12>
                <h3>{{text.customButtonStyles}}</h3>
            </v-flex>
        </v-layout>

        <v-layout row wrap>

            <v-flex md2 xs12>
                <p>{{text.chooseButtonStyles}}</p>
            </v-flex>

            <v-flex md3 xs12>
                <v-radio-group
                        v-on:change="saveSetting('direct_stripe_use_custom_styles', $event)"
                        v-model="styleMode"
                >
                    <v-radio
                            :label="text.stylesRadioNo"
                            value="3"
                            :key="3"
                    ></v-radio>
                    <v-radio
                            :label="text.styleRadioStripe"
                            value="2"
                            :key="2"
                    ></v-radio>
                    <v-radio
                            :label="text.styleRadioDS"
                            value="1"
                            :key="1"
                    ></v-radio>
                </v-radio-group>
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
        styleMode: ''
      }
    },
    mounted () {
      axios
        .get(SETTINGS)
        .then(response => {
          this.allData = response.data;

          if( response.data.direct_stripe_use_custom_styles === '3' ) {
            this.styleMode = '3';
          } else if ( response.data.direct_stripe_use_custom_styles === '2' ) {
            this.styleMode = '2';
          } else if ( response.data.direct_stripe_use_custom_styles === '1' ) {
            this.styleMode = '1';
          }

        })
        .catch(error => console.log(error))
    }
  }
</script>

<style scoped>

</style>