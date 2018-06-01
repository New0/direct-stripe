<template>
    <div>
        <hr />
        <v-layout row>
            <v-flex xs12>
                <h3>{{text.billingInformation}}</h3>
            </v-flex>
        </v-layout>

        <v-layout row>
            <v-flex md3>
                <p>{{text.billingAddress}}</p>
            </v-flex>
            <v-flex md1>
                <v-checkbox
                        v-on:change="saveSetting( 'direct_stripe_billing_infos_checkbox', $event )"
                        v-model="billingMode"
                ></v-checkbox>
            </v-flex>
            <v-flex md3>

            </v-flex>
        </v-layout>

        <v-layout row>
            <v-flex md3>
                <p>{{text.shippingAddress}}</p>
            </v-flex>
            <v-flex md1>
                <v-checkbox
                        v-on:change="saveSetting( 'direct_stripe_shipping_infos_checkbox', $event )"
                        v-model="shippingMode"
                ></v-checkbox>
            </v-flex>
            <v-flex md3>

            </v-flex>
        </v-layout>


        <v-layout row>
            <v-flex md3>
                <p>{{text.rememberMe}}</p>
            </v-flex>
            <v-flex md1>
                <v-checkbox
                        v-on:change="saveSetting( 'direct_stripe_rememberme_option_checkbox', $event )"
                        v-model="remembermeMode"
                ></v-checkbox>
            </v-flex>
            <v-flex md3>

            </v-flex>
        </v-layout>

    </div>
</template>

<script>
  import axios from 'axios';

  const SETTINGS = ds_admin_app_vars.api.settings;
  const strings = ds_admin_app_vars.strings;

  export default {
    name: 'setBilling',
    data () {
      return {
        text: strings,
        billingMode: false,
        shippingMode: false,
        remembermeMode: false
      }
    },
    mounted () {
      axios
        .get(SETTINGS)
        .then(response => {

          if( response.data.direct_stripe_billing_infos_checkbox === 'false' ) {
            this.billingMode = false;
          } else if ( response.data.direct_stripe_billing_infos_checkbox === 'true' ) {
            this.billingMode = true;
          } else if ( response.data.direct_stripe_shipping_infos_checkbox === 'false' ) {
            this.shippingMode = false;
          } else if ( response.data.direct_stripe_shipping_infos_checkbox === 'true' ) {
            this.shippingMode = true;
          } else if ( response.data.direct_stripe_rememberme_option_checkbox === 'false' ) {
            this.remembermeMode = false;
          } else if ( response.data.direct_stripe_rememberme_option_checkbox=== 'true' ) {
            this.remembermeMode = true;
          }

        })
        .catch(error => console.log(error))
    }
  }
</script>

<style scoped>

</style>