<template>
    <div>
        <v-layout row wrap>
            <v-flex md2 xs12>
                <label for="dsBorderRadius">{{text.borderRadius}}</label>
            </v-flex>
            <v-flex md1 xs6>
                <v-text-field
                        v-on:change="saveSetting( 'direct_stripe_border_radius', $event )"
                        v-bind:name="borderRadius"
                        v-bind:value="borderRadius"
                        id="dsBorderRadius"
                ></v-text-field>
            </v-flex>
            <v-flex md2 xs6>
                <p class="pl-2">px</p>
            </v-flex>
        </v-layout>
    </div>
</template>

<script>
  import axios from 'axios';

  const SETTINGS = ds_admin_app_vars.api.settings;
  const strings = ds_admin_app_vars.strings;

  export default {
    name: 'borderRadius',
    data () {
      return {
        text: strings,
        borderRadius: ''
      }
    },
    mounted () {
      axios
        .get(SETTINGS)
        .then(response => {
          this.borderRadius = response.data.direct_stripe_border_radius;
        })
        .catch(error => console.log(error))
    }
  }
</script>

<style scoped>

</style>