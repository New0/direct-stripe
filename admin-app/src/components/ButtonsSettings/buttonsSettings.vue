<template>
    <div>

        <v-layout row mb-3>
            <v-flex xs12>

                <h2>{{ text.buttonsSettings }}</h2>

                <div>{{ text.createButtonsTitle}}</div>

                <input type="text" v-model="newButton">
                <v-btn color="success" class="option" v-on:click="pushButton( newButton, null, null, null )">{{ text.createButtons }}</v-btn>

            </v-flex>
        </v-layout>

        <hr />

        <v-layout row>
            <v-flex md2>

                <h2>{{ text.editButtonTitle }}</h2>

                <v-select
                        v-on:change="setSettings( $event )"
                        class="ds-select-button"
                        :label="text.selectButton"
                        v-model="selectedButton"
                        :items="buttons"
                >
                </v-select>
            </v-flex>
            <v-flex md-4>

                <h3 v-if="selectedButton != null">{{ text.currentlySelected }} : {{ selectedButton.text }}</h3>
                <h3 v-else>{{ text.currentlySelectedNo }}</h3>

            </v-flex>

            <v-flex v-if="selectedButton != null" md-4>

                <v-btn color="warning" class="option" v-on:click.native="show = !show">{{ text.deleteButton }}</v-btn>

                <v-tooltip v-model="show" top absolute>
                    <span>{{ text.defdeleteButton }}</span>
                    <v-btn color="error" v-on:click="deleteButton( selectedButton )">{{ text.yes }}</v-btn>
                    <v-btn color="info" v-on:click.native="show = !show">{{ text.no }}</v-btn>
                </v-tooltip>


            </v-flex>

        </v-layout>

        <div v-if="selectedButton != null">

            <v-layout row>
                <v-flex xs12>

                    <h3>{{ text.buttonMainOptions }}</h3>
                    <p>{{ text.buttonMainDescription }}</p>

                </v-flex>
            </v-layout>

            <v-layout row>

                <v-flex md4 pa-3>
                    <label for="buttonType">{{ text.typeLabel }}</label>
                    <v-select
                            id="buttonType"
                            :label="text.selectButtonType"
                            v-on:change="pushButton( selectedButton.text, selectedButton, 'type' , $event)"
                            :items="buttonTypes"
                            v-model="buttonType"
                            class="input-group--focused"
                            single-line
                    ></v-select>
                </v-flex>

                <v-flex md4 pa-3>
                    <label for="buttonAmount">{{ text.valueAmountLabel }}</label>
                    <v-text-field
                            id="buttonAmount"
                            v-on:change="pushButton( selectedButton.text, selectedButton, 'amount' , $event)"
                            :name="selectedButton.amount"
                            :value="selectedButton.amount"
                            v-model="selectedButton.amount"
                            :hint="text.valueAmountHint"
                    ></v-text-field>
                </v-flex>

                <v-flex md4 pa-3>
                    <label for="buttonIDValue">{{ text.valueIDLabel }}</label>
                    <v-text-field
                            id="buttonIDValue"
                            :name="selectedButton.value"
                            :value="selectedButton.value"
                            disabled
                    ></v-text-field>
                </v-flex>
            </v-layout>

        </div>

    </div>
</template>

<script>
  import axios from 'axios';

  const API_BUTTONS = ds_admin_app_vars.api.buttons;
  const strings = ds_admin_app_vars.strings;
  const nonce = ds_admin_app_vars.api.nonce;

  export default {
    name: 'buttonSettings',
    data() {
      return {
        show: false,
        text: strings,
        buttons: [],
        selectedButton: null,
        newButton: '',
        buttonTypes: [
          {
            'text': 'Payment',
            'value': 'payment'
          },
          {
            'text': 'Subscription',
            'value': 'subscription'
          },
          {
            'text': 'Donation',
            'value': 'donation'
          }
        ],
        buttonType: '',
        rules: {
          required: (value) => !!value || strings.requiredField,
          email: (value) => {
            const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            return pattern.test(value) || 'Invalid e-mail.'
          }
        }
      }
    },
    mounted () {
      axios
        .get(API_BUTTONS)
        .then(response => {
            let allButtons = this.buttons;
            jQuery.each( response.data, function( key, value ) {
                let button = {
                  'text': value.text,
                  'id': value.value,
                  'value': value
                }
                allButtons.push( button );
            });
            this.buttons = allButtons;
          }
        )
    },
    methods: {
      pushButton ( newButton, button, setting, event ) {

        if( typeof button === "undefined" || button === null ) { //Create Button

          function uniqueNumber() {
            let date = Date.now();
            if (date <= uniqueNumber.previous) {
              date = ++uniqueNumber.previous;
            } else {
              uniqueNumber.previous = date;
            }
            return date;
          }
          uniqueNumber.previous = 0;
          function ID(){
            return uniqueNumber();
          }

          let buttonID = "ds-" + ID();

          const defaultData = {
            text: newButton,
            value: buttonID,
            type: "Payment",
            amount: 1000,
            button_id: "My Button",
            description: "Description",
            label: "Label",
            panellabel: "Panel Label",
            coupon: "Coupon",
            setup_fee: null,
            zero_decimal: "false",
            capture: "true",
            billing: "false",
            shipping: "false",
            tc: "false",
            rememberme: "true",
            display_amount: "false",
            currency: "USD",
            custom_role: null,
            success_query: "success query_args",
            error_query: "error query_args",
            success_url: "custom success url",
            error_url: "custom error url"
          };
          this.buttons.push(  {
            'text': defaultData.text,
            'id': buttonID,
            'value': defaultData
            }
          );

          const button = this.buttons.find( function(element) {
            return element.id === buttonID;
          });
          const but = JSON.stringify(button.value);

          const req_url = API_BUTTONS + '?id=' + buttonID + '&data=' + but + '&_dsnonce=' + nonce;

          let el = jQuery('#save-result');
          function bubble(){
            el[0].classList.add('active')
            setTimeout(() => {
              el[0].classList.remove('active')
            }, 3000)
          }

          axios
            .post(req_url)
            .then( response => {
              console.log(response);
                if (typeof response.data === "undefined" || response.data === null) {
                  bubble()
                } else {
                  console.log(response);
                  if (response.data.error === true) {
                    console.log(response.data.text);
                  }
                }
              }
            )
            .catch ( error => {
                console.log(error);
                    if (typeof error.data.message === "undefined" || error.data.message === null) {
                        console.log(error.message);
                    }
                }
            )



        } else { //Edit Button

          if( typeof setting === 'undefined' || setting === null ) {
            return;
          }

          button[setting] = event;
          this.buttons.push(
            {
            'text': button.text,
            'value': button
            }
          );

          const but = JSON.stringify(button);
          const req_url = API_BUTTONS + '?id=' + button.value + '&data=' + but + '&_dsnonce=' + nonce;

          let el = jQuery('#save-result');
          function bubble(){
            el[0].classList.add('active')
            setTimeout(() => {
              el[0].classList.remove('active')
            }, 3000)
          }

          axios
            .post(req_url)
            .then(response => {
              console.log(response);
                if (typeof response.data === "undefined" || response.data === null) {
                  bubble()
                } else {
                  console.log(response);
                  if (response.data.error === true) {
                    console.log(response.data.text);
                  }
                }
              }
            )
            .catch(error => {
                console.log(error)
                  if (typeof error.message === "undefined" || error.message === null) {
                    console.log(error.data.message);
                  }
                }
            )

        }

      },
      deleteButton: function( button ) {
        console.log( button.value );

        let el = jQuery('#save-result');
        function bubble(){
          el[0].classList.add('active')
          setTimeout(() => {
            el[0].classList.remove('active')
          }, 3000)
        }

        const req_url = API_BUTTONS + '?id=' + button.value + '&delete=yes&_dsnonce=' + nonce;
        axios
          .post(req_url)
          .then(response => {
              if (typeof response.data === "undefined" || response.data === null) {
                bubble();
              } else {
                if (response.data.error === true) {
                  console.log(response.data.text);
                }
              }
            }
          )
          .catch(error => console.log(error))
        //Interface actions
        this.buttons.pop(button);
        this.show = false;
      },
      setSettings: function( event ) {
        this.buttonType = event.type;
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>