<template>
    <div>
        <hr/>
        <v-layout row wrap>
            <v-flex xs12>
                <h3>{{text.modalFormLogo}}</h3>
            </v-flex>
        </v-layout>

        <v-layout row wrap>

            <v-flex md3 xs12>
                <v-btn
                        v-on:click="open_media_uploader_image()"
                >{{text.selectImage}}</v-btn>
                <v-btn
                        v-on:click="remove_attachment()"
                >{{text.removeImage}}</v-btn>

            </v-flex>

            <v-flex md4 xs12>
                <div id="dsModalLogo">
                    <img class="Header-logoImage"
                         :alt="text.altAttachment"
                         :src="attachmentURL"
                    />
                </div>
            </v-flex>

        </v-layout>
        <br/><br/>
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
        .then(response => {
          this.attachmentURL = response.data.direct_stripe_logo_image;
        })
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
        border: 3px solid #fff;
        width: 70px;
        height: 70px;
        border-radius: 100%;
        box-shadow: 0 0 0 1px rgba(0,0,0,.18),0 2px 2px 0 rgba(0,0,0,.08);

        .Header-logoImage {
            width: 64px;
            height: 64px;
            margin: 1px;
            border-radius: 100%;
            background: #fff;
            background-position-x: 0%;
            background-position-y: 0%;
            background-image: none;
            background-size: auto auto;
            background-position: 50% 50%;
            background-size: cover;
            display: inline-block;
        }
    }
</style>