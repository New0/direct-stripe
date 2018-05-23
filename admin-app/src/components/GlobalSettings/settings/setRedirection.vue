<template>
    <div>
        <hr/>
        <v-layout row>
            <v-flex xs12>

                <h3>{{text.redirection}}</h3>

            </v-flex>
        </v-layout>

        <v-layout row>
            <v-flex md2>

                <p>{{text.selectSuccessPage}}</p>

            </v-flex>
            <v-flex md1>
                <v-checkbox
                        v-on:change="saveSetting( 'direct_stripe_use_redirections', $event )"
                        v-model="useRedirections"
                ></v-checkbox>
            </v-flex>
            <v-flex md4>
                <span>{{text.successPage}}</span>
            </v-flex>
        </v-layout>

        <v-layout row>
            <v-flex md2>
                <p>{{text.successPage}}</p>
            </v-flex>
            <v-flex md3>
                <v-select
                        v-on:change="saveSetting('direct_stripe_success_page', $event)"
                        :items="successPages"
                        :label="text.textSelect"
                        v-model="successPage"
                        class="input-group--focused"
                        single-line
                ></v-select>
            </v-flex>
        </v-layout>

        <v-layout row>
            <v-flex md2>
                <p>{{text.errorPage}}</p>
            </v-flex>
            <v-flex md3>
                <v-select
                        v-on:change="saveSetting('direct_stripe_error_page', $event)"
                        :items="errorPages"
                        :label="text.textSelect"
                        v-model="errorPage"
                        class="input-group--focused"
                        single-line
                ></v-select>
            </v-flex>
        </v-layout>

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

          if( response.data.direct_stripe_use_redirections === 'false' ) {
            this.useRedirections = false;
          } else if ( response.data.direct_stripe_use_redirections === 'true' ) {
            this.useRedirections = true;
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