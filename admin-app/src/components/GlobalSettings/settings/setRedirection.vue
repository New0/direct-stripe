<template>
    <div>
        <hr/>
        <v-layout row wrap>
            <v-flex xs12>

                <h3>{{text.redirection}}</h3>

            </v-flex>
        </v-layout>

        <v-layout row wrap>
            <v-flex>
                <v-switch
                        v-on:change="saveSetting( 'direct_stripe_use_redirections', $event )"
                        v-model="useRedirections"
                        :label="text.useRedirectionPages"
                ></v-switch>
            </v-flex>
        </v-layout>

        <v-layout row wrap>
            <v-flex md2 xs12>
                <label for="successPage">{{text.successPage}}</label>
            </v-flex>
            <v-flex md3 xs12>
                <v-select
                        v-on:change="saveSetting('direct_stripe_success_page', $event)"
                        :items="successPages"
                        :label="text.textSelect"
                        v-model="successPage"
                        solo
                        id="successPage"
                ></v-select>
            </v-flex>
        </v-layout>

        <v-layout row wrap>
            <v-flex md2 xs12>
                <label for="errorPage">{{text.errorPage}}</label>
            </v-flex>
            <v-flex md3 xs12>
                <v-select
                        v-on:change="saveSetting('direct_stripe_error_page', $event)"
                        :items="errorPages"
                        :label="text.textSelect"
                        v-model="errorPage"
                        solo
                        id="errorPage"
                ></v-select>
            </v-flex>
        </v-layout>
        <br/>
    </div>
</template>

<script>
  import axios from 'axios';

  const SETTINGS = ds_admin_app_vars.api.settings;
  const PAGES = ds_admin_app_vars.api.pages;
  const strings = ds_admin_app_vars.strings;

  export default {
    name: 'setRedirection',
    data () {
      return {
        allData: '',
        text: strings,
        useRedirections: false,
        successPages: [],
        successPage: '',
        errorPages: [],
        errorPage: '',
      }
    },
    mounted () {
      axios
        .get(SETTINGS)
        .then(response => {
          this.allData = response.data;

          if( response.data.direct_stripe_use_redirections === true ) {
            this.useRedirections = true;
          } else {
            this.useRedirections = false;
          }

          this.successPage = response.data.direct_stripe_success_page;
          this.errorPage = response.data.direct_stripe_error_page;
        })
        .catch(error => console.log(error))
      axios
        .get(PAGES)
        .then(response => {
            for (var i = 0; i < response.data.length; i++) {
                this.successPages.push({
                    value: response.data[i].link,
                    text: response.data[i].title.rendered
                });
                this.errorPages.push({
                    value: response.data[i].link,
                    text: response.data[i].title.rendered
                });
              }
        })
        .catch(error => console.log(error))
    }
  }
</script>

<style scoped>

</style>