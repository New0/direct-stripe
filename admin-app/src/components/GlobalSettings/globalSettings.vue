<template>
    <v-container fluid>
        <apiKeys></apiKeys>
        <setCurrency></setCurrency>
        <setCallbacks></setCallbacks>
        <setRedirection></setRedirection>
        <setLogo></setLogo>
        <setRecords></setRecords>
    </v-container>
</template>

<script>
  import apikeys from './settings/apiKeys.vue';
  import setCurrency from './settings/setCurrency.vue';
  import setCallbacks from './settings/setCallbacks.vue';
  import setRedirection from './settings/setRedirection.vue';
  import setLogo from './settings/setLogo.vue';
  import setRecords from './settings/setRecords.vue';

  export default {
    name: 'globalSettings',
    components: {
      'apiKeys': apikeys,
      'setCurrency': setCurrency,
      'setCallbacks': setCallbacks,
      'setRedirection': setRedirection,
      'setLogo': setLogo,
      'setRecords': setRecords
    }
  }
</script>

<style scoped lang="scss">

</style>