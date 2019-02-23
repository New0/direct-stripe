<template>

  <v-app>

    <div>
        <div id="save-result">
            <span class="option-saved">{{text.settingSaved}}</span>
        </div>
        <div id="load-result">
            <div class="spinner"></div>
            <div class="lds-hourglass"></div>
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
                value="global-settings"
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
                value="styles-settings"
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
                value="email-settings"
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
                value="buttons-settings"
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
    name: 'dsAdmin',
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
        color: #32373C;
        font-size: 1.143rem;

        label, p {
          color: #32373C;
          font-size: 1.143rem;
        }

        .primary-, .accent- {
            &-text {
                color: #0073AA !important;
            }
        }
        a {

            &:active, &:hover {
                color: #0073AA !important;
            }

        }
        textarea, input[type="text"] {
            box-shadow: none;
            border: none;
        }
        .v-tabs__container {
            background-color: #F1F1F1;
        }
        .v-tabs__item--active {
            border-bottom: solid thin #0073AA;
        }

        /*.option {
            + .option-saved {
                display: none;
            }
            &.active {
                + .option-saved {
                    display: block;
                }
            }
        }*/
        #save-result {
            position: fixed;
            left: 50%;
            top: 15%;
            z-index: 1111111111;
            transform: translateX(-110%);

            > .option-saved {
                display: none;
                font-size: 1.8rem;
                color:  #32373C;
                padding: 0.6rem 1rem;
                background-color: #C7E8CA;
                border: thin solid #C7E8CA;
            }
            &.active {
                > .option-saved{
                    display: block;
                }
            }
        }
        .v-input {
            margin-top: 0;
        }
        .v-select__selection + input {
            visibility: hidden;
        }
        .v-text-field input {
            padding: 8px;
        }

        #load-result {
            position: fixed;
            left: 50%;
            top: 25%;
            z-index: 111111111111111;
            transform: translateX(-110%);

            &.active {
                > .lds-hourglass {
                    display: inline-block;
                }
            }

            .lds-hourglass {
                display: none;
                position: relative;
                width: 64px;
                height: 64px;
            }
            .lds-hourglass:after {
                content: " ";
                display: block;
                border-radius: 50%;
                width: 0;
                height: 0;
                margin: 6px;
                box-sizing: border-box;
                border: 26px solid #0073AA;
                border-color: #0073AA transparent #0073AA transparent;
                animation: lds-hourglass 1.2s infinite;
            }
            @keyframes lds-hourglass {
                0% {
                    transform: rotate(0);
                    animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);
                }
                50% {
                    transform: rotate(900deg);
                    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
                }
                100% {
                    transform: rotate(1800deg);
                }
            }
        }

    }

</style>
