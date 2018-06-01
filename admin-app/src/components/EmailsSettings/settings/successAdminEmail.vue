<template>
    <div>

        <v-layout row>
            <v-flex xs12>

                <h3>{{text.successAdminEmailTitle}}</h3>

            </v-flex>
        </v-layout>

        <v-layout row>
            <v-flex md2>

                <p>{{text.checkSAE}}</p>

            </v-flex>
            <v-flex md1>
                <v-checkbox
                        v-on:change="saveSetting( 'direct_stripe_admin_emails_checkbox', $event )"
                        v-model="saeMode"
                ></v-checkbox>
            </v-flex>
        </v-layout>

        <v-layout row>
            <v-flex md2>
                <p>{{text.adminSEmailSubject}}</p>
            </v-flex>
            <v-flex md3>
                <v-text-field
                        v-on:change="saveSetting( 'direct_stripe_admin_email_subject', $event )"
                        v-bind:name="allData.direct_stripe_admin_email_subject"
                        v-bind:label="allData.direct_stripe_admin_email_subject"
                        v-bind:value="allData.direct_stripe_admin_email_subject"
                        single-line
                ></v-text-field>
            </v-flex>
        </v-layout>

        <v-layout row>
            <v-flex md2>

                <p>{{text.adminSEmailContent}}</p>

            </v-flex>
            <v-flex md4>
                <v-text-field
                        v-on:change="saveSetting('direct_stripe_admin_email_content', $event)"
                        v-bind:name="allData.direct_stripe_admin_email_content"
                        v-bind:placeholder="allData.direct_stripe_admin_email_content"
                        v-bind:value="allData.direct_stripe_admin_email_content"
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
    name: 'successAdminEmail.vue',
    data () {
      return {
        allData: '',
        text: strings,
        saeMode: false
      }
    },
    mounted () {
      axios
        .get(SETTINGS)
        .then(response => {
          this.allData = response.data;

          if( response.data.direct_stripe_admin_emails_checkbox === 'false' ) {
            this.saeMode = false;
          } else if ( response.data.direct_stripe_admin_emails_checkbox === 'true' ) {
            this.saeMode = true;
          }

        })
        .catch(error => console.log(error))
    }
  }
</script>

<style scoped>

</style>