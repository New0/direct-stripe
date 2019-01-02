<template>
    <div>
        <h4>{{text.emailsIntro}}</h4>
        <br/>
        <code>
            {{text.emailsIntroCode}}
        </code>

    </div>
</template>

<script>
	const strings = ds_admin_app_vars.strings;
	export default {
		name: 'emailIntro',
		data () {
			return {
				text: strings
			}
		},
	}
</script>

<style scoped>

</style>