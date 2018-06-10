<template>
<div>
    <hr/>
    <v-layout row wrap>
        <v-flex xs12>
            <h3>{{text.currency}}</h3>
        </v-flex>
    </v-layout>

    <v-layout row wrap>
        <v-flex md2 xs12>
           <p>{{text.currency}}</p>
        </v-flex>
        <v-flex md2 xs12>
            <v-select
                    v-on:change="saveSetting('direct_stripe_currency', $event)"
                    v-bind:items="currencies"
                    v-bind:label="text.textSelect"
                    v-model="currency"
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
  const strings = ds_admin_app_vars.strings;

  export default {
    name: 'currency',
    data () {
      return {
        text: strings,
        currency: null,
        currencies: [
              'USD', 'EUR', 'GBP','AUD', 'CAD', 'JPY', 'DKK', 'NOK', 'SEK', 'SGD', 'HKD', 'CHF', 'MXN', 'BRL', 'NZD'
          ]
      }
    },
    mounted () {
      axios
        .get(SETTINGS)
        .then(response => (
           this.currency = response.data.direct_stripe_currency
        ))
        .catch(error => console.log(error))
    }
  }
</script>

<style scoped>

</style>