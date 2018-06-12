<template>
    <div>
        <hr />

        <v-layout row wrap>
            <v-flex md2 xs12>
                <h3>{{text.termsAndConditions}}</h3>
            </v-flex>
        </v-layout>

        <v-layout row wrap>
            <v-flex md2>
                <p>{{text.useTC}}</p>
            </v-flex>
            <v-flex md1 offset-md1 offset-xs0>
                <v-switch
                        v-on:change="saveSetting( 'direct_stripe_use_tc_checkbox', $event )"
                        v-model="tcMode"
                ></v-switch>
            </v-flex>
        </v-layout>

        <v-layout row wrap>
            <v-flex md2 xs12>
                <p>{{text.tcText}}</p>
            </v-flex>
            <v-flex md3 xs12>
                <v-text-field
                        v-on:change="saveSetting( 'direct_stripe_tc_text', $event )"
                        v-bind:name="allData.direct_stripe_tc_text"
                        v-bind:label="allData.direct_stripe_tc_text"
                        v-bind:value="allData.direct_stripe_tc_text"
                        v-bind:id="allData.direct_stripe_tc_text"
                        single-line
                ></v-text-field>
            </v-flex>
        </v-layout>

        <v-layout row wrap>
            <v-flex md2 xs12>
                <p>{{text.tcTextLinked}}</p>
            </v-flex>
            <v-flex md3 xs12>
                <v-text-field
                        v-on:change="saveSetting( 'direct_stripe_tc_link_text', $event )"
                        v-bind:name="allData.direct_stripe_tc_link_text"
                        v-bind:label="allData.direct_stripe_tc_link_text"
                        v-bind:value="allData.direct_stripe_tc_link_text"
                        v-bind:id="allData.direct_stripe_tc_link_text"
                        single-line
                ></v-text-field>
            </v-flex>
        </v-layout>

        <v-layout row wrap>
            <v-flex md2 xs12>
                <p>{{text.tcPage}}</p>
            </v-flex>
            <v-flex md3 xs12>
                <v-select
                        v-on:change="saveSetting('direct_stripe_tc_link', $event)"
                        :items="tcPages"
                        :label="text.textSelect"
                        v-model="tcPage"
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
    name: 'setTC',
    data () {
      return {
        allData: '',
        text: strings,
        tcMode: false,
        tcPages: [],
        tcPage: '',
      }
    },
    mounted () {
      axios
        .get(SETTINGS)
        .then(response => {

          this.allData = response.data;

          if( response.data.direct_stripe_use_tc_checkbox === false ) {
            this.testMode = false;
          } else if ( response.data.direct_stripe_use_tc_checkbox === true ) {
            this.testMode = true;
          }

          this.tcPage = response.data.direct_stripe_tc_link;

        })
        .catch(error => console.log(error))
      axios
        .get(PAGES)
        .then(response => {
          for (var i = 0; i < response.data.length; i++) {
            this.tcPages.push({
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