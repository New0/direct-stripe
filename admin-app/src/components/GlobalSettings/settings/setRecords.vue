<template>
    <div>
        <hr />
        <v-layout row wrap>
            <v-flex xs12>
                <h3>{{text.recordsInformation}}</h3>
            </v-flex>
        </v-layout>

        <v-layout row wrap>
            <v-flex>
                <v-switch
                        v-on:change="saveSetting( 'direct_stripe_check_records', $event )"
                        v-model="recordsMode"
                        :label="text.recordsMore"
                ></v-switch>
            </v-flex>
        </v-layout>


    </div>
</template>

<script>
  import axios from 'axios';

  const SETTINGS = ds_admin_app_vars.api.settings;
  const strings = ds_admin_app_vars.strings;

  export default {
    name: 'setRecords',
    data () {
      return {
        text: strings,
        recordsMode: false
      }
    },
    mounted () {
      axios
        .get(SETTINGS)
        .then(response => {

          if( response.data.direct_stripe_check_records === false ) {
            this.recordsMode = false;
          } else if ( response.data.direct_stripe_check_records === true ) {
            this.recordsMode = true;
          }

        })
        .catch(error => console.log(error))
    }
  }
</script>

<style scoped>

</style>