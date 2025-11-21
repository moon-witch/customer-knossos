<script lang="ts">
    import { _ } from 'svelte-i18n';
</script>

<section class="about-container">
    <div class="content-wrapper">
        <h2 class="section-label">{$_('about.label')}</h2>
        <h3 class="headline">{$_('about.headline')}</h3>
        <p>{$_('about.p1')}</p>
        <p>{$_('about.p2')}</p>
        <p>{$_('about.p3')}</p>
        <p>{$_('about.p4')}</p>
    </div>
</section>

<style lang="scss">
  .about-container {
    width: 100dvw;
    background: #f7f4ef;
    color: #222;
    display: flex;
    justify-content: center;
  }

  .content-wrapper {
    margin: 2rem auto;
    max-width: 700px;
    text-align: center;

    @media (min-width: 768px) {
      text-align: left;
    }
  }

  .section-label {
    font-size: 0.9rem;
    letter-spacing: 2px;
    margin-bottom: 1rem;
    color: #7c3421;
    text-transform: uppercase;
  }

  .headline {
    font-size: 2rem;
    margin-bottom: 2rem;
    font-family: 'Gelio Pasteli', sans-serif;

    @media (min-width: 768px) {
      font-size: 2.4rem;
    }
  }

  p {
    line-height: 1.55;
    margin-bottom: 1.5rem;
    opacity: 0.95;
    font-size: 1.05rem;
    padding: 0 1rem;

    @media (min-width: 768px) {
      font-size: 1.1rem;
      padding: 0;
    }
  }
</style>
