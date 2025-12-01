<script lang="ts">
    import Header from "$lib/components/Header.svelte";
    import frontal from "$lib/assets/images/knossos-frontal.jpg"


</script>

<section class="hero">
    <section class="header">
        <Header />
    </section>
    <img
            src={frontal}
            alt="frontal of the taverna knossos"
            class="hero-image"
    />
</section>

<style lang="scss">
  .hero {
    position: relative;
    display: flex;
    align-items: center;

    @media (max-width: 768px) {
      flex-direction: column-reverse;
    }

    .header {
      width: 30dvw;

      @media (max-width: 768px) {
        width: 100%;
      }
    }

    .hero-image {
      height: 100dvh;
      width: 70dvw;
      object-fit: cover;
      filter: brightness(0.8) contrast(1.5);

      @media (max-width: 768px) {
        width: 100%;
        height: 50dvh;
        object-fit: cover;
      }
    }
  }
</style>