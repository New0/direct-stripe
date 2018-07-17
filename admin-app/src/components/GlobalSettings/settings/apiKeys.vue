<template>
<div>
    <v-layout row wrap>
        <v-flex xs12>
            <h3>{{text.setApiKeys}}</h3>
        </v-flex>
    </v-layout>

    <v-layout row wrap>
        <v-flex xs12 md2>
            <label for="pubKey">{{text.livePKey}}</label>
        </v-flex>
        <v-flex md3 xs12>
            <v-text-field
                    v-on:change="saveSetting( 'direct_stripe_publishable_api_key', $event )"
                    v-bind:name="allData.direct_stripe_publishable_api_key"
                    v-bind:value="allData.direct_stripe_publishable_api_key"
                    id="pubKey"
            ></v-text-field>
        </v-flex>
    </v-layout>

    <v-layout row wrap>
        <v-flex sm12 md2 xs12>
            <label for="secKey">{{text.liveSKey}}</label>
        </v-flex>
        <v-flex md3 xs12>
            <v-text-field
                    v-on:change="saveSetting( 'direct_stripe_secret_api_key', $event )"
                    v-bind:name="allData.direct_stripe_secret_api_key"
                    v-bind:value="allData.direct_stripe_secret_api_key"
                    id="secKey"
            ></v-text-field>
        </v-flex>
    </v-layout>

    <br/>

    <v-layout row wrap>
        <v-flex md3 xs12>
            <v-switch
                    v-on:change="saveSetting( 'direct_stripe_checkbox_api_keys', $event )"
                    v-model="testMode"
                    :label="text.useTestKeys"
            ></v-switch>
        </v-flex>
        <v-flex md3 xs12>
            <a href="https://stripe.com/docs/testing" title="Stripe tests" target="_blank" class="primary--text">{{text.testLink}}</a><br/>
            <span>{{text.testKeyNumber}}</span><br/>
            <span>{{text.testKeyCvv}}</span>
        </v-flex>
    </v-layout>

    <br/>

    <v-layout row wrap>
        <v-flex md2 xs12>
            <label for="testPKey">{{text.testPKey}}</label>
        </v-flex>
        <v-flex md3 xs12>
            <v-text-field
                    v-on:change="saveSetting( 'direct_stripe_test_publishable_api_key', $event )"
                    v-bind:name="allData.direct_stripe_test_publishable_api_key"
                    v-bind:value="allData.direct_stripe_test_publishable_api_key"
                    id="testPKey"
            ></v-text-field>
        </v-flex>
    </v-layout>

    <v-layout row wrap>
        <v-flex md2 xs12>
            <label for="testSKey">{{text.testSKey}}</label>
        </v-flex>
        <v-flex md3 xs12>
            <v-text-field
                    v-on:change="saveSetting( 'direct_stripe_test_secret_api_key', $event )"
                    v-bind:name="allData.direct_stripe_test_secret_api_key"
                    v-bind:value="allData.direct_stripe_test_secret_api_key"
                    id="testSKey"
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

          if( response.data.direct_stripe_checkbox_api_keys === false ) {
            this.testMode = false;
          } else if ( response.data.direct_stripe_checkbox_api_keys === true ) {
            this.testMode = true;
          }

        })
        .catch(error => console.log(error))
    }
  }
</script>

<style scoped>

</style>