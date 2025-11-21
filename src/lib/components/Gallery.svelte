<script lang="ts">
    import { onMount } from 'svelte';
    import PhotoSwipeLightbox from 'photoswipe/lightbox';
    import 'photoswipe/style.css';
    import { _ } from 'svelte-i18n';

    // Explicitly type the image map
    const imageModules = import.meta.glob(
        '$lib/assets/images/gallery/*.{jpg,jpeg,png,webp}',
        { eager: true, query: '?url', import: 'default' }
    ) as Record<string, string>;

    const images = Object.values(imageModules);

    let lightbox: PhotoSwipeLightbox;

    onMount(() => {
        lightbox = new PhotoSwipeLightbox({
            gallery: '#gallery',
            children: 'a',
            pswpModule: () => import('photoswipe')
        });
        lightbox.init();

        return () => lightbox.destroy();
    });

    function setImageSize(event: Event) {
        const img = event.target as HTMLImageElement;
        const link = img.parentElement as HTMLAnchorElement;

        if (!link) return;

        link.setAttribute('data-pswp-width', img.naturalWidth.toString());
        link.setAttribute('data-pswp-height', img.naturalHeight.toString());
    }
</script>

<section class="gallery-section">
    <h2 class="title">{$_('gallery.headline')}</h2>

    <div id="gallery" class="gallery-grid">
        {#each images as src}
            <a href={src} data-pswp-src={src}>
                <img
                        src={src}
                        alt="Taverna Knossos gallery"
                        loading="lazy"
                        on:load={setImageSize}
                />
            </a>
        {/each}
    </div>
</section>

<style lang="scss">
  .gallery-section {
    padding: 3rem 2rem;
    background: #f7f4ef;
  }

  .title {
    text-align: center;
    font-family: 'Gelio Pasteli', sans-serif;
    font-size: 2rem;
    margin-bottom: 3rem;

    @media (min-width: 768px) {
      font-size: 2.4rem;
    }
  }

  .gallery-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(90px, 1fr));
    gap: 0.8rem;

    @media (min-width: 768px) {
      grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
      gap: 1.2rem;
    }
  }

  .gallery-grid a {
    overflow: hidden;
    border-radius: 12px;
  }

  .gallery-grid img {
    width: 100%;
    height: 90px;
    object-fit: cover;
    display: block;
    transition: transform 0.4s ease;

    @media (min-width: 768px) {
      height: 260px;
    }
  }

  .gallery-grid img:hover {
    transform: scale(1.05);
  }
</style>
