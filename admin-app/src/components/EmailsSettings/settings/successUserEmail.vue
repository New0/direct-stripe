<template>
    <div>
        <hr />

        <v-layout row wrap>
            <v-flex xs12>

                <h3>{{text.successUserEmailTitle}}</h3>

            </v-flex>
        </v-layout>

        <v-layout row wrap>
            <v-flex>
                <v-switch
                        v-on:change="saveSetting( 'direct_stripe_user_emails_checkbox', $event )"
                        v-model="sueMode"
                        :label="text.checkSUE"
                ></v-switch>
            </v-flex>
        </v-layout>

        <v-layout row wrap>
            <v-flex md2 xs12>
                <label for="userEmailSubjectSuccess">{{text.userSEmailSubject}}</label>
            </v-flex>
            <v-flex md3 xs12>
                <v-text-field
                        v-on:change="saveSetting( 'direct_stripe_user_email_subject', $event )"
                        v-bind:name="allData.direct_stripe_user_email_subject"
                        v-bind:value="allData.direct_stripe_user_email_subject"
                        id="userEmailSubjectSuccess"
                ></v-text-field>
            </v-flex>
        </v-layout>

        <v-layout row wrap>
            <v-flex md2 xs12>

                <label for="userEmailContentSuccess">{{text.userSEmailContent}}</label>

            </v-flex>
            <v-flex md4 xs12>
                <v-textarea
                        v-on:change="saveSetting('direct_stripe_user_email_content', $event)"
                        v-bind:name="allData.direct_stripe_user_email_content"
                        v-bind:placeholder="allData.direct_stripe_user_email_content"
                        id="userEmailContentSuccess"
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
    name: 'successUserEmail.vue',
    data () {
      return {
        allData: '',
        text: strings,
        sueMode: false
      }
    },
    mounted () {
      axios
        .get(SETTINGS)
        .then(response => {
          this.allData = response.data;

          if( response.data.direct_stripe_user_emails_checkbox === false ) {
            this.sueMode = false;
          } else if ( response.data.direct_stripe_user_emails_checkbox === true ) {
            this.sueMode = true;
          }

        })
        .catch(error => console.log(error))
    }
  }
</script>

<style scoped>

</style>