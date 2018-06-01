<template>
    <div>
        <hr />

        <v-layout row>
            <v-flex xs12>

                <h3>{{text.errorAdminEmailTitle}}</h3>

            </v-flex>
        </v-layout>

        <v-layout row>
            <v-flex md2>

                <p>{{text.checkEAE}}</p>

            </v-flex>
            <v-flex md1>
                <v-checkbox
                        v-on:change="saveSetting( 'direct_stripe_admin_error_emails_checkbox', $event )"
                        v-model="eaeMode"
                ></v-checkbox>
            </v-flex>
        </v-layout>

        <v-layout row>
            <v-flex md2>
                <p>{{text.adminEEmailSubject}}</p>
            </v-flex>
            <v-flex md3>
                <v-text-field
                        v-on:change="saveSetting( 'direct_stripe_admin_error_email_subject', $event )"
                        v-bind:name="allData.direct_stripe_admin_error_email_subject"
                        v-bind:label="allData.direct_stripe_admin_error_email_subject"
                        v-bind:value="allData.direct_stripe_admin_error_email_subject"
                        single-line
                ></v-text-field>
            </v-flex>
        </v-layout>

        <v-layout row>
            <v-flex md2>

                <p>{{text.adminEEmailContent}}</p>

            </v-flex>
            <v-flex md4>
                <v-text-field
                        v-on:change="saveSetting('direct_stripe_admin_error_email_content', $event)"
                        v-bind:name="allData.direct_stripe_admin_error_email_content"
                        v-bind:placeholder="allData.direct_stripe_admin_error_email_content"
                        v-bind:value="allData.direct_stripe_admin_error_email_content"
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
    name: 'errorAdminEmail.vue',
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

          if( response.data.direct_stripe_admin_error_emails_checkbox === 'false' ) {
            this.eaeMode = false;
          } else if ( response.data.direct_stripe_admin_error_emails_checkbox === 'true' ) {
            this.eaeMode = true;
          }

        })
        .catch(error => console.log(error))
    }
  }
</script>

<style scoped>

</style>