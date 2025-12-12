<script lang="ts">
    import '$lib/i18n';
	import favicon from '$lib/assets/favicon.svg';
    import 'swiper/swiper-bundle.css';
    import 'swiper/element-bundle';
    import LangSwitcher from "$lib/components/LangSwitcher.svelte";

    let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div class="lang-switcher">
    <LangSwitcher />
</div>
{@render children()}

<style lang="scss">
    @use "../lib/styles/main";

    .lang-switcher {
      position: fixed;
      top: 1rem;
      right: 1rem;
      z-index: 1000;
    }
</style>