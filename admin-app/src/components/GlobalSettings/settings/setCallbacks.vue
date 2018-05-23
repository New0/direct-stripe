<template>
<div>
    <hr/>
    <v-layout row>
        <v-flex md3>

            <h3>{{text.bubbleMessages}}</h3>

        </v-flex>
    </v-layout>

    <v-layout row>
        <v-flex md3>

            <h3>{{text.successBubble}}</h3>

        </v-flex>
        <v-flex md4>
            <v-text-field
                    v-on:change="saveSetting('direct_stripe_success_message', $event)"
                    v-bind:name="allData.direct_stripe_success_message"
                    v-bind:placeholder="allData.direct_stripe_success_message"
                    v-bind:value="allData.direct_stripe_success_message"
                    box
                    multi-line
            ></v-text-field>
        </v-flex>
    </v-layout>

    <v-layout row>
        <v-flex md3>

            <h3>{{text.errorBubble}}</h3>

        </v-flex>
        <v-flex md4>
            <v-text-field
                    v-on:change="saveSetting('direct_stripe_error_message', $event)"
                    v-bind:name="allData.direct_stripe_error_message"
                    v-bind:placeholder="allData.direct_stripe_error_message"
                    v-bind:value="allData.direct_stripe_error_message"
                    box
                    multi-line
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
    name: 'setCallbacks',
    data () {
      return {
        text: strings,
        allData: ''
      }
    },
    mounted () {
      axios
        .get(SETTINGS)
        .then(response => (
          this.allData = response.data
        ))
        .catch(error => console.log(error))
    }
  }
</script>

<style scoped>

</style>