<template>

  <v-app>

    <div>
        <div id="save-result">
            <span class="option-saved">{{text.settingSaved}}</span>
        </div>
      <v-tabs
              icons-and-text
              v-model="active"
      >
        <v-tab
                v-bind:key="globalSettings"
                ripple
        >
            {{text.general}}
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
          {{text.styles}}
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
          {{text.emails}}
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
          {{text.buttons}}
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
  import globalSettings from './components/GlobalSettings/globalSettings.vue';
  import stylesSettings from './components/StylesSettings/stylesSettings.vue';
  import emailsSettings from './components/EmailsSettings/emailsSettings.vue';
  import buttonsSettings from './components/ButtonsSettings/buttonsSettings.vue';

  const strings = ds_admin_app_vars.strings;

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
        text: strings
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
  #save-result {
      position: fixed;
      left: 50%;
      top: 15%;
      z-index: 1111111111;
      transform: translateX(-110%);

    > .option-saved {
        display: none;
        color:  #8bc34a;
        padding: 0.6rem 1rem;
        background-color: #fff;
        border: thin solid #8bc34a;
    }
    &.active {
      > .option-saved {
        display: block;
      }
    }
  }
  .input-group--text-field-box:not(.input-group--textarea).input-group--multi-line .input-group__input {
      padding-top: 0;
  }
  .input-group--text-field {
    padding-top: 5px;

      label {
          top: 0;
      }
  }
  .input-group {
    &.input-group--selection-controls {
      &.switch {
        padding-top: 10px;
      }
    }
  }

</style>
