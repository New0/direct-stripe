<template>
    <div>
        <hr/>
        <v-layout row wrap>
            <v-flex xs12>
                <h3>{{text.modalFormLogo}}</h3>
            </v-flex>
        </v-layout>

        <v-layout row wrap>
            <v-flex md2 xs12>
                <p>{{text.selectImage}}</p>
            </v-flex>
            <v-flex md2 xs12>
                <v-btn
                        v-on:click="open_media_uploader_image()"
                >{{text.selectImage}}</v-btn>
                <v-btn
                        v-on:click="remove_attachment()"
                >{{text.removeImage}}</v-btn>
            </v-flex>

            <v-flex md4 xs12>
                <div id="dsModalLogo">
                    <img v-bind:src="attachmentURL" v-bind:alt="text.altAttachment" />
                </div>
            </v-flex>

        </v-layout>
    </div>
</template>

<script>
  import axios from 'axios';

  const SETTINGS = ds_admin_app_vars.api.settings;
  const strings = ds_admin_app_vars.strings;
  const nonce = ds_admin_app_vars.api.nonce;

  let media_uploader = null;

  export default {
    name: 'setLogo',
    data () {
      return {
        text: strings,
        attachmentURL: '',
      }
    },
    mounted () {
      axios
        .get(SETTINGS)
        .then(response => (
          this.attachmentURL = response.data.direct_stripe_logo_image
        ))
        .catch(error => console.log(error))
    },
    methods: {
      open_media_uploader_image: function () {

        media_uploader = wp.media({
          title: this.text.wpMediaTitle,
          button: {
            text: this.text.wpMediaButton
          },
          multiple: false
        });

        media_uploader.on("select", function(){
          const attachment = media_uploader.state().get("selection").first().toJSON();

          let imgContainer = jQuery('#dsModalLogo img');
          let el = jQuery('#save-result');

          function bubble(){
            el[0].classList.add('active')
            setTimeout(() => {
              el[0].classList.remove('active')
            }, 3000)
          }

          const req_url = SETTINGS + '?direct_stripe_logo_image=' + attachment.url + '&_dsnonce=' + nonce;

          axios
            .post(req_url)
            .then(response => {
              bubble()
             jQuery(imgContainer).attr( "src", attachment.url);
            })
            .catch(error => console.log(error))

        });

        media_uploader.open();
      },
      remove_attachment: function () {
        let imgContainer = jQuery('#dsModalLogo img');
        let el = jQuery('#save-result');

        function bubble(){
          el[0].classList.add('active')
          setTimeout(() => {
            el[0].classList.remove('active')
          }, 3000)
        }

        const req_url = SETTINGS + '?direct_stripe_logo_image=empty' + '&_dsnonce=' + nonce;

        axios
          .post(req_url)
          .then(response => {
            bubble()
            jQuery(imgContainer).attr( "src", "#");
          })
          .catch(error => console.log(error))

      }
    }
  }
</script>

<style lang="scss" scoped>
    #dsModalLogo {
        img {
            max-width: 100%;
        }
    }
</style>