<template>

    <v-container fluid>
        <v-layout row>
            <v-flex xs4>
                <v-subheader>{{ds_test_p_key}}</v-subheader>
            </v-flex>
            <v-flex xs8>
                <v-text-field
                        v-on:change="saving('direct_stripe_test_publishable_api_key', $event)"
                        v-bind:name="ds_test_p_key"
                        v-bind:label="ds_test_p_key"
                        v-bind:value="ds_test_p_key"
                        single-line
                ></v-text-field>
            </v-flex>
        </v-layout>
        <v-layout row>
            <v-flex xs4>
                <v-subheader>{{ds_test_s_key}}</v-subheader>
            </v-flex>
            <v-flex xs8>
                <v-text-field
                        v-on:change="saving('direct_stripe_test_secret_api_key', $event)"
                        v-bind:name="ds_test_s_key"
                        v-bind:label="ds_test_s_key"
                        v-bind:value="ds_test_s_key"
                        single-line
                ></v-text-field>
            </v-flex>


        </v-layout>
    </v-container>

</template>

<script>
  import axios from 'axios';

  const SETTINGS = ds_admin_app_vars.api.settings;
  //const logo = ds_admin_app_vars.dsCoreUrl + 'admin-app/dist/logo.png';

  export default {
    name: 'globalSettings',
    data () {
      return {
        //path: logo,
        ds_test_p_key: '',
        ds_test_s_key: ''
      }
    },
    mounted () {
      axios
        .get(SETTINGS)
        .then(response => (
          this.ds_test_p_key = response.data.direct_stripe_test_publishable_api_key,
            this.ds_test_s_key = response.data.direct_stripe_test_secret_api_key
        ))
        .catch(error => console.log(error))
    },
    methods: {
      saving: function (message, event) {

        const req_url = SETTINGS + '?' + message + '=' + event;
        axios
          .post(req_url)
          .then(response => (
            console.log('Saved !')
          ))
          .catch(error => console.log(error))
      },
      addRow () {
        this.inputs.push({
          one: {
            name: 'name',
            cool: 'coolos'
          }
        })
      },
      deleteRow (index) {
        this.inputs.splice(index, 1)
      }
    }
  }
</script>

<style scoped lang="scss">

</style>