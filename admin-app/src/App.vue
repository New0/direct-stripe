<template>

       <v-app>

           <div>

               <v-tabs
                       icons-and-text
                       v-model="active"
               >
                   <v-tab
                           v-bind:key="globalSettings"
                           ripple
                   >
                       Global Settings
                       <v-icon>settings</v-icon>
                   </v-tab>
                   <v-tab-item
                           v-bind:key="globalSettings"
                   >
                       <globalSettings></globalSettings>
                   </v-tab-item>
                   <v-tab
                           v-bind:key="stylesSettings"
                           ripple
                   >
                       Styles Settings
                       <v-icon>styles</v-icon>
                   </v-tab>
                   <v-tab-item
                           v-bind:key="stylesSettings"
                   >
                       <stylesSettings></stylesSettings>
                   </v-tab-item>
                   <v-tab
                           v-bind:key="emailsSettings"
                           ripple
                   >
                       Emails Settings
                       <v-icon>emails</v-icon>
                   </v-tab>
                   <v-tab-item
                           v-bind:key="emailsSettings"
                   >
                       <emailsSettings></emailsSettings>
                   </v-tab-item>
                   <v-tab
                           v-bind:key="buttonsSettings"
                           ripple
                   >
                       Buttons Settings
                       <v-icon>payment</v-icon>
                   </v-tab>
                   <v-tab-item
                           v-bind:key="buttonsSettings"
                   >
                       <buttonsSettings></buttonsSettings>
                   </v-tab-item>
               </v-tabs>

           </div>

       </v-app>


</template>

<script>
import globalSettings from './components/globalSettings.vue';
import stylesSettings from './components/stylesSettings.vue';
import emailsSettings from './components/emailsSettings.vue';
import buttonsSettings from './components/buttonsSettings.vue';

export default {
  name: 'app',
  components: {
    globalSettings,
    stylesSettings,
    emailsSettings,
    buttonsSettings
  },
  data () {
    return {
      active: null,
    }
  }
}
</script>

<style lang="scss">
    #app {
        background-color: #F1F1F1;
    }
    .theme--light {
        .tabs__bar {
            background-color: #F1F1F1;
        }
    }
    .option {
        + .option-saved {
            display: none;
        }
        &.active {
            + .option-saved {
                display: block;
            }
        }
    }

</style>
