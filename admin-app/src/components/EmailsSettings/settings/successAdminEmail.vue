<template>
    <div>

        <v-layout row wrap>
            <v-flex xs12>

                <h3>{{text.successAdminEmailTitle}}</h3>

            </v-flex>
        </v-layout>

        <v-layout row wrap>
            <v-flex>
                <v-switch
                        v-on:change="saveSetting( 'direct_stripe_admin_emails_checkbox', $event )"
                        v-model="saeMode"
                        :label="text.checkSAE"
                ></v-switch>
            </v-flex>
        </v-layout>

        <v-layout row wrap>
            <v-flex md2 xs12>
                <label for="emailAdminSubjectSuccess">{{text.adminSEmailSubject}}</label>
            </v-flex>
            <v-flex md3 xs12>
                <v-text-field
                        v-on:change="saveSetting( 'direct_stripe_admin_email_subject', $event )"
                        v-bind:name="allData.direct_stripe_admin_email_subject"
                        v-bind:value="allData.direct_stripe_admin_email_subject"
                        id="emailAdminSubjectSuccess"
                ></v-text-field>
            </v-flex>
        </v-layout>

        <v-layout row wrap>
            <v-flex md2 xs12>

                <label for="emailAdminContentSuccess">{{text.adminSEmailContent}}</label>

            </v-flex>
            <v-flex md4 xs12>
                <v-textarea
                        v-on:change="saveSetting('direct_stripe_admin_email_content', $event)"
                        v-bind:name="allData.direct_stripe_admin_email_content"
                        v-bind:placeholder="allData.direct_stripe_admin_email_content"
                        v-bind:value="allData.direct_stripe_admin_email_content"
                        id="emailAdminContentSuccess"
                        solo
                ></v-textarea>
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

          if( response.data.direct_stripe_admin_emails_checkbox === false ) {
            this.saeMode = false;
          } else if ( response.data.direct_stripe_admin_emails_checkbox === true ) {
            this.saeMode = true;
          }

        })
        .catch(error => console.log(error))
    }
  }
</script>

<style scoped>

</style>