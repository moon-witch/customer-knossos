<script lang="ts">
    import '$lib/i18n';
	import favicon from '$lib/assets/favicon.svg';
    import 'swiper/swiper-bundle.css';
    import 'swiper/element-bundle';

let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

{@render children()}

<style lang="scss">
    @use "../lib/styles/main";
</style>