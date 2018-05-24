<template>
    <v-container fluid>
        <setStylesType></setStylesType>
        <colorPicker></colorPicker>
    </v-container>
</template>

<script>
  import setStylesType from './settings/setStylesType.vue';
  import colorPicker from './settings/colorPicker.vue';

  export default {
    name: 'globalSettings',
    components: {
      'setStylesType': setStylesType,
      'colorPicker': colorPicker,
    }
  }
</script>

<style scoped lang="scss">

</style>