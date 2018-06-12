<template>
    <v-container fluid>
        <setStylesType></setStylesType>
        <colorPicker></colorPicker>
        <borderRadius></borderRadius>
        <setTC></setTC>
    </v-container>
</template>

<script>
  import setStylesType from './settings/setStylesType.vue';
  import colorPicker from './settings/colorPicker.vue';
  import borderRadius from './settings/borderRadius.vue';
  import setTC from './settings/setTC.vue';

  export default {
    name: 'globalSettings',
    components: {
      'setStylesType': setStylesType,
      'colorPicker': colorPicker,
      'borderRadius': borderRadius,
      'setTC': setTC
    }
  }
</script>

<style scoped lang="scss">

</style>