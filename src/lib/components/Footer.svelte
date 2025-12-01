<script lang="ts">
    import { _ } from "svelte-i18n";
    import KnossosSpiral from "$lib/components/KnossosSpiral.svelte";
    import moon from "$lib/assets/images/moon.png"

    const imprintLink = "/imprint";
    const disclaimerLink = "/disclaimer";
</script>

<footer class="footer">
    <div class="footer-content">
        <div class="contact">
            <p class="address">{$_('findUs.address')}</p>
            <p class="phone">{$_('findUs.phone')}</p>
        </div>

        <KnossosSpiral />

        <div class="legal">
            <a href={imprintLink}>{$_('footer.imprint')}</a>
            <span>•</span>
            <a href={disclaimerLink}>{$_('footer.disclaimer')}</a>
        </div>
    </div>
    <div class="moonwitch">{$_('creator')} <a href="https://www.moonwitch.art" target="_blank">moonwitch</a><img src={moon} alt="moonwitch logo" class="moonwitch-logo"/></div>
</footer>

<style lang="scss">
  .footer {
    background: #f7f4ef;
    color: #7c3421;
    padding: 2.5rem 1.5rem;
    border-top: 1px solid rgba(124, 52, 33, 0.15);
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }

  .footer-content {
    max-width: 1100px;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    text-align: center;
    justify-content: center;
    align-items: center;

    @media (min-width: 768px) {
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
    }
  }

  .contact {
    line-height: 1.5;
    font-size: 0.95rem;
    width: 30%;

    @media (max-width: 768px) {
      width: 100%;
    }
  }

  .address {
    margin: 0;
  }

  .phone {
    margin: 0.3rem 0 0 0;
    font-weight: 500;
  }

  .legal {
    font-size: 0.9rem;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
    width: 30%;

    @media (max-width: 768px) {
      width: 100%;
    }
  }

  .legal a {
    text-decoration: none;
    color: inherit;
    opacity: 0.85;
    transition: opacity 0.2s ease;
  }

  .legal a:hover {
    opacity: 1;
    text-decoration: underline;
  }

  .moonwitch {
    padding-top: 2rem;
    font-size: 1rem;
    color: #7c3421;
    display: flex;
    align-items: center;
    gap: 0.5rem;

    a{
      color: inherit;
    }

    .moonwitch-logo{
      width: 1.666rem;
      height: 1.666rem;
    }
  }
</style>
