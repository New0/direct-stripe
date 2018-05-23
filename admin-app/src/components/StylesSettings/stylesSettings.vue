<template>
    <v-container fluid>
        <setStylesType></setStylesType>
    </v-container>
</template>

<script>
  import setStylesType from './settings/setStylesType.vue';

  export default {
    name: 'globalSettings',
    components: {
      'setStylesType': setStylesType,
    }
  }
</script>

<style scoped lang="scss">

</style>