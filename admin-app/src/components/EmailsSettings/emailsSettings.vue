<template>
    <v-container fluid>
        <emailsIntro></emailsIntro>
        <successAdminEmail></successAdminEmail>
        <successUserEmail></successUserEmail>
        <errorAdminEmail></errorAdminEmail>
        <errorUserEmail></errorUserEmail>
    </v-container>
</template>

<script>
   import emailsIntro from './settings/emailsIntro.vue';
  import successAdminEmail from './settings/successAdminEmail.vue';
  import successUserEmail from './settings/successUserEmail.vue';
  import errorAdminEmail from './settings/errorAdminEmail.vue';
  import errorUserEmail from './settings/errorUserEmail.vue';

  export default {
    name: 'emailSettings',
    components: {
    	'emailsIntro': emailsIntro,
      'successAdminEmail': successAdminEmail,
      'successUserEmail': successUserEmail,
      'errorAdminEmail': errorAdminEmail,
      'errorUserEmail': errorUserEmail,
    }
  }
</script>

<style scoped lang="scss">

</style>