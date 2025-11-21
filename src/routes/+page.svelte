<script lang="ts">
    import Hero from "$lib/components/Hero.svelte";
    import Rating from "$lib/components/Rating.svelte";
    import About from "$lib/components/About.svelte";
    import Gallery from "$lib/components/Gallery.svelte";
    import Footer from "$lib/components/Footer.svelte";
    import FindUs from "$lib/components/FindUs.svelte";
    import LangSwitcher from "$lib/components/LangSwitcher.svelte";
</script>

<div class="container">
    <div class="lang-switcher">
        <LangSwitcher />
    </div>
    <Hero />
    <About />
    <Rating />
    <Gallery />
    <FindUs />
    <Footer />
</div>

<style lang="scss">
    .lang-switcher {
      position: fixed;
      top: 1rem;
      right: 1rem;
      z-index: 1000;
    }
</style>
