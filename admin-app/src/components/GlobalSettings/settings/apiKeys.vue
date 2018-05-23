<template>
<div>
    <v-layout row>
        <v-flex xs12>
            <h3>{{text.setApiKeys}}</h3>
        </v-flex>
    </v-layout>

    <v-layout row>
        <v-flex md2>
            <p>{{text.livePKey}}</p>
        </v-flex>
        <v-flex md3>
            <v-text-field
                    v-on:change="saveSetting( 'direct_stripe_live_publishable_api_key', $event )"
                    v-bind:name="allData.direct_stripe_live_publishable_api_key"
                    v-bind:label="allData.direct_stripe_live_publishable_api_key"
                    v-bind:value="allData.direct_stripe_live_publishable_api_key"
                    v-bind:id="allData.direct_stripe_live_publishable_api_key"
                    single-line
            ></v-text-field>
        </v-flex>
    </v-layout>

    <v-layout row>
        <v-flex md2>
            <p>{{text.liveSKey}}</p>
        </v-flex>
        <v-flex md3>
            <v-text-field
                    v-on:change="saveSetting( 'direct_stripe_live_secret_api_key', $event )"
                    v-bind:name="allData.direct_stripe_live_secret_api_key"
                    v-bind:label="allData.direct_stripe_live_secret_api_key"
                    v-bind:value="allData.direct_stripe_live_secret_api_key"
                    single-line
            ></v-text-field>
        </v-flex>
    </v-layout>

    <v-layout row>
        <v-flex md2>
            <p>{{text.useTestKeys}}</p>
        </v-flex>
        <v-flex md1>
            <v-checkbox
                    v-on:change="saveSetting( 'direct_stripe_checkbox_api_keys', $event )"
                    v-model="testMode"
            ></v-checkbox>
        </v-flex>
        <v-flex md3>
            <v-subheader><a href="https://stripe.com/docs/testing" title="Stripe tests" target="_blank">{{text.testLink}}</a></v-subheader>
            <span>{{text.testKeyNumber}}</span><br/>
            <span>{{text.testKeyCvv}}</span>
        </v-flex>
    </v-layout>

    <v-layout row>
        <v-flex md2>
            <p>{{text.testPKey}}</p>
        </v-flex>
        <v-flex md3>
            <v-text-field
                    v-on:change="saveSetting( 'direct_stripe_test_publishable_api_key', $event )"
                    v-bind:name="allData.direct_stripe_test_publishable_api_key"
                    v-bind:label="allData.direct_stripe_test_publishable_api_key"
                    v-bind:value="allData.direct_stripe_test_publishable_api_key"
                    v-bind:id="allData.direct_stripe_test_publishable_api_key"
                    single-line
            ></v-text-field>
        </v-flex>
    </v-layout>

    <v-layout row>
        <v-flex md2>
            <p>{{text.testSKey}}</p>
        </v-flex>
        <v-flex md3>
            <v-text-field
                    v-on:change="saveSetting( 'direct_stripe_test_secret_api_key', $event )"
                    v-bind:name="allData.direct_stripe_test_secret_api_key"
                    v-bind:label="allData.direct_stripe_test_secret_api_key"
                    v-bind:value="allData.direct_stripe_test_secret_api_key"
                    single-line
            ></v-text-field>
        </v-flex>
    </v-layout>
</div>
</template>

<script>
  import axios from 'axios';

  const SETTINGS = ds_admin_app_vars.api.settings;
  const strings = ds_admin_app_vars.strings;

  export default {
    name: 'apiKeys',
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
    }
  }
</script>

<style scoped>

</style>