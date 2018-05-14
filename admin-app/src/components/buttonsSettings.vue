<template>

    <v-layout row>
        <v-flex xs12 sm6 offset-sm3>

            <h2>Create Button</h2>

            <input type="text" v-model="newButton">
            <v-button class="option" v-on:click="addButton(newButton, $event)">Add button</v-button>
            <span class="option-saved">{{optionSaved}}</span>

            <h2>Edit Button</h2>

            <select label="Select button" v-model="selectedButton">

                <option v-for="button in buttons" v-bind:value="button">{{ button.text }}</option>

            </select>

            <span>Sélectionné : {{ selectedButton.type }} / {{ selectedButton.value}}</span>

        </v-flex>
    </v-layout>

</template>

<script>
  import axios from 'axios';

  const API_BUTTONS = ds_admin_app_vars.api.buttons;

  export default {
    name: 'buttonsSettings',
    data() {
      return {
        buttons: [],
        selectedButton: {},
        newButton: '',
        optionSaved: 'Saved !'
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
      saving: function (index, button) {

        const but = JSON.stringify(button)

        const req_url = API_BUTTONS + '?id=' + but + '&data=' + but;

        axios
          .post(req_url)
          .then(response => (
            console.log(but)
          ))
          .catch(error => console.log(error))

      },
      addButton (newButton, event) {

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

        const req_url = API_BUTTONS + '?id=' + buttonID + '&data=' + but;

        let el = event.target;

        function bubble(){
          el.classList.add('active')
          setTimeout(() => {
            el.classList.remove('active')
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
      deleteButton (index) {
        this.buttons.splice(index, 1)
      }

    }
  }

</script>

<style scoped>

</style>