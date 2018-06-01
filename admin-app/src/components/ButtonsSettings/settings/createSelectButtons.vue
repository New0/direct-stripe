<template>
    <div>

        <v-layout row>
            <v-flex xs12>

                <h2>{{ text.buttonsSettings }}</h2>

                <div>{{ text.createButtonsTitle}}</div>

                <input type="text" v-model="newButton">
                <v-btn class="option" v-on:click="addButton(newButton, $event)">{{ text.createButtons }}</v-btn>
                <span class="option-saved">{{optionSaved}}</span>

            </v-flex>
        </v-layout>

        <hr />

        <v-layout row>
            <v-flex xs12>

                <h2>{{ text.editButtonTitle }}</h2>

                <select class="custom-select" label="Select button" v-model="selectedButton">

                    <option v-for="button in buttons" v-bind:value="button">{{ button.text }}</option>

                </select>

                <span>Sélectionné : {{ selectedButton.type }} / {{ selectedButton.value}}</span>

            </v-flex>
        </v-layout>

    </div>
</template>

<script>
  import axios from 'axios';

  const API_BUTTONS = ds_admin_app_vars.api.buttons;
  const strings = ds_admin_app_vars.strings;
  const nonce = ds_admin_app_vars.api.nonce;

  export default {
    name: 'createButton',
    data() {
      return {
        text: strings,
        buttons: [],
        selectedButton: {},
        newButton: '',
      }
    },
    mounted () {
      axios
        .get(API_BUTTONS)
        .then(response => (
            this.buttons = Object.values( response.data )
          )
        )
    },
    methods: {
      addButton ( newButton ) {

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

        const buttonID = "ds-" + ID();

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
        this.buttons.push( defaultData );

        const button = this.buttons.find( function(element) {
          return element.value === buttonID;
        });

        const but = JSON.stringify(button);

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
          .then(response => (
              bubble()
            )
          )
          .catch(error => console.log(error))

      },
    }
  }
</script>

<style scoped>

    /*the container must be positioned relative:*/
    .custom-select {
        position: relative;
        font-family: Arial;
    }
    .custom-select select {
        display: none; /*hide original SELECT element:*/
    }
    .select-selected {
        background-color: DodgerBlue;
    }
    /*style the arrow inside the select element:*/
    .select-selected:after {
        position: absolute;
        content: "";
        top: 14px;
        right: 10px;
        width: 0;
        height: 0;
        border: 6px solid transparent;
        border-color: #fff transparent transparent transparent;
    }
    /*point the arrow upwards when the select box is open (active):*/
    .select-selected.select-arrow-active:after {
        border-color: transparent transparent #fff transparent;
        top: 7px;
    }
    /*style the items (options), including the selected item:*/
    .select-items div,.select-selected {
        color: #ffffff;
        padding: 8px 16px;
        border: 1px solid transparent;
        border-color: transparent transparent rgba(0, 0, 0, 0.1) transparent;
        cursor: pointer;
    }
    /*style items (options):*/
    .select-items {
        position: absolute;
        background-color: DodgerBlue;
        top: 100%;
        left: 0;
        right: 0;
        z-index: 99;
    }
    /*hide the items when the select box is closed:*/
    .select-hide {
        display: none;
    }
    .select-items div:hover, .same-as-selected {
        background-color: rgba(0, 0, 0, 0.1);
    }

</style>