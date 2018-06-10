<template>
    <div>
        <hr />

        <v-layout row wrap>
            <v-flex xs12>

                <h3>{{text.errorUserEmailTitle}}</h3>

            </v-flex>
        </v-layout>

        <v-layout row wrap>
            <v-flex md2>

                <p>{{text.checkEUE}}</p>

            </v-flex>
            <v-flex md1>
                <v-switch
                        v-on:change="saveSetting( 'direct_stripe_user_error_emails_checkbox', $event )"
                        v-model="eaeMode"
                ></v-switch>
            </v-flex>
        </v-layout>

        <v-layout row wrap>
            <v-flex md2 xs12>
                <p>{{text.userEEmailSubject}}</p>
            </v-flex>
            <v-flex md3 xs12>
                <v-text-field
                        v-on:change="saveSetting( 'direct_stripe_user_error_email_subject', $event )"
                        v-bind:name="allData.direct_stripe_auser_error_email_subject"
                        v-bind:label="allData.direct_stripe_user_error_email_subject"
                        v-bind:value="allData.direct_stripe_user_error_email_subject"
                        single-line
                ></v-text-field>
            </v-flex>
        </v-layout>

        <v-layout row wrap>
            <v-flex md2 xs12>

                <p>{{text.userEEmailContent}}</p>

            </v-flex>
            <v-flex md4 xs12>
                <v-text-field
                        v-on:change="saveSetting('direct_stripe_user_error_email_content', $event)"
                        v-bind:name="allData.direct_stripe_user_error_email_content"
                        v-bind:placeholder="allData.direct_stripe_user_error_email_content"
                        v-bind:value="allData.direct_stripe_user_error_email_content"
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
    name: 'errorUserEmail.vue',
    data () {
      return {
        allData: '',
        text: strings,
        eaeMode: false
      }
    },
    mounted () {
      axios
        .get(SETTINGS)
        .then(response => {
          this.allData = response.data;

          if( response.data.direct_stripe_user_error_emails_checkbox === false ) {
            this.eaeMode = false;
          } else if ( response.data.direct_stripe_user_error_emails_checkbox === true ) {
            this.eaeMode = true;
          }

        })
        .catch(error => console.log(error))
    }
  }
</script>

<style scoped>

</style>