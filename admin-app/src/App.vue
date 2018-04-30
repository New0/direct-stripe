<template>
  <div id="app">
    <img v-bind:src="path" >
    <h1>{{ msg }}</h1>
      <div v-for="currency in info" class="currency">
          {{currency.description}}
          <span class="lighten">
      <span v-html="currency.symbol"></span>{{ currency.rate_float | currencydecimal }}
    </span>
      </div>

  </div>
</template>

<script>
import axios from 'axios';

const dsaav = direct_stripe_admin_app_vars.dsCoreUrl + 'admin-app/dist/logo.png';

export default {
  name: 'app',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      path: dsaav,
      info: null
    }
  },
  mounted () {
    axios
      .get('https://api.coindesk.com/v1/bpi/currentprice.json')
      .then(response => ( this.info = response.data.bpi ))
  }
}
</script>

<style lang="scss">

</style>
