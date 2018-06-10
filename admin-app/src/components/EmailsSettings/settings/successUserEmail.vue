<template>
    <div>
        <hr />

        <v-layout row wrap>
            <v-flex xs12>

                <h3>{{text.successUserEmailTitle}}</h3>

            </v-flex>
        </v-layout>

        <v-layout row wrap>
            <v-flex md2>

                <p>{{text.checkSUE}}</p>

            </v-flex>
            <v-flex md1>
                <v-switch
                        v-on:change="saveSetting( 'direct_stripe_user_emails_checkbox', $event )"
                        v-model="sueMode"
                ></v-switch>
            </v-flex>
        </v-layout>

        <v-layout row wrap>
            <v-flex md2 xs12>
                <p>{{text.userSEmailSubject}}</p>
            </v-flex>
            <v-flex md3 xs12>
                <v-text-field
                        v-on:change="saveSetting( 'direct_stripe_user_email_subject', $event )"
                        v-bind:name="allData.direct_stripe_user_email_subject"
                        v-bind:label="allData.direct_stripe_user_email_subject"
                        v-bind:value="allData.direct_stripe_user_email_subject"
                        single-line
                ></v-text-field>
            </v-flex>
        </v-layout>

        <v-layout row wrap>
            <v-flex md2 xs12>

                <p>{{text.userSEmailContent}}</p>

            </v-flex>
            <v-flex md4 xs12>
                <v-text-field
                        v-on:change="saveSetting('direct_stripe_user_email_content', $event)"
                        v-bind:name="allData.direct_stripe_user_email_content"
                        v-bind:placeholder="allData.direct_stripe_user_email_content"
                        v-bind:value="allData.direct_stripe_user_email_content"
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