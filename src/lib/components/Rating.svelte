<script lang="ts">
    import { onMount, tick } from 'svelte';
    import { _ } from 'svelte-i18n';

    type Review = {
        author: string;
        rating: number;
        time: string;
        text: string;
        profile_photo: string;
        link: string;
    };

    let data:
        | {
        name: string;
        address: string;
        rating: number;
        reviews_count: number;
        link: string;
        top_reviews: Review[];
    }
        | null = null;

    let swiperEl: HTMLElement | null = null;

    onMount(async () => {
        // 1) Register Swiper custom elements (client-only)
        const { register } = await import('swiper/element/bundle');
        register();

        // 2) Fetch Google rating + reviews from your API
        const res = await fetch('/api/rating');
        data = await res.json();

        // 3) Wait for Svelte to render the <swiper-container> and slides
        await tick();

        // 4) Configure and initialize Swiper Element
        if (swiperEl) {
            const params = {
                slidesPerView: 1,
                spaceBetween: 24,
                centeredSlides: true,
                loop: true,
                pagination: { clickable: true },
                speed: 800,
                effect: 'slide',
                autoplay: {
                    delay: 3000,
                    disableOnInteraction: true
                },
                breakpoints: {
                    640: { slidesPerView: 1 },
                    768: { slidesPerView: 2 },
                    1024: { slidesPerView: 3 }
                }
            };

            Object.assign(swiperEl, params);

            // @ts-ignore - initialize() is provided by Swiper Element
            swiperEl.initialize();
        }
    });
</script>

{#if data}
    <section class="reviews">
        <h3 class="headline">{$_('rating.headline')}</h3>
        <header class="summary">
            <div class="rating-summary">
                <div class="stars">
                    {#each Array(5) as _, i}
                        <span class="star {i < Math.round(data.rating) ? 'filled' : ''}">★</span>
                    {/each}
                </div>
                <div class="rating-number">
                    {data.rating.toFixed(1)} / 5
                </div>
                <div class="review-count">
                    ({data.reviews_count} reviews)
                </div>
            </div>

            <a href={data.link} target="_blank" rel="noopener" class="maps-link">
                {$_('rating.mapLink')}
            </a>
        </header>

        <!-- IMPORTANT: init="false" so we can configure via props before initialize() -->
            <swiper-container
                    bind:this={swiperEl}
                    class="review-swiper"
                    init="false"
            >
                {#each data.top_reviews as r (r.author)}
                    <swiper-slide>
                        <article class="review-card">
                            <div class="content">
                                <div class="header">
                                    <a href={r.link} target="_blank" rel="noopener" class="author">
                                        {r.author}
                                    </a>
                                    <span class="time">{r.time}</span>
                                </div>

                                <div class="stars small">
                                    {#each Array(5) as _, i}
                                        <span class="star {i < Math.round(r.rating) ? 'filled' : ''}">★</span>
                                    {/each}
                                </div>

                                <p class="text">
                                    {r.text}
                                </p>
                            </div>
                        </article>
                    </swiper-slide>
                {/each}
            </swiper-container>
    </section>
{:else}
    <p class="loading">Loading reviews…</p>
{/if}

<style lang="scss">
  .reviews {
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 100%;
    margin: 0 auto;
    padding: 1rem 1rem;
  }

  .headline {
    font-size: 2rem;
    margin-bottom: 2rem;
    font-family: 'Gelio Pasteli', sans-serif;

    @media (min-width: 768px) {
      font-size: 2.4rem;
    }
  }

  /* --- Header with name, stars, count --- */
  .summary {
    text-align: center;
    margin-bottom: 1.5rem;

    .rating-summary {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      flex-wrap: wrap;
      margin-bottom: 0.5rem;

      .stars {
        font-size: 1.25rem;
        color: #ccc;

        .star.filled {
          color: #fffc33;
        }
      }

      .rating-number {
        font-weight: 500;
      }

      .review-count {
        color: #666;
      }
    }

    .maps-link {
      display: inline-block;
      margin-top: 0.25rem;
      font-size: 0.9rem;
      color: $primary;
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    }
  }

  /* --- Swiper container + navigation/pagination styling --- */
  .review-swiper {
    width: 90%;
    padding: 0;
  }

  /* Swiper Element is a custom element; navigation buttons live in its shadow DOM.
     Use CSS variables so they are visible in all viewports (including mobile). */
  :global(swiper-container.review-swiper) {
    --swiper-navigation-color: #333;
    --swiper-pagination-color: #fffc33;
    --swiper-navigation-size: 26px;
  }

  /* --- Review card styling --- */
  .review-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 0.75rem;
    padding: 1.5rem 1rem;
    border-radius: 0.75rem;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    background: #f7f4ef;
    min-height: 280px;
    height: 100%;
    transition: transform 0.3s ease;

    .content {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;

      .header {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.25rem;
      }

      .author {
        font-weight: 600;
        text-decoration: none;
        color: #222;

        &:hover {
          text-decoration: underline;
        }
      }

      .time {
        font-size: 0.8rem;
        color: #777;
      }

      .stars.small {
        font-size: 1rem;
        color: #ccc;

        .star.filled {
          color: #ffd500;
        }
      }

      .text {
        font-size: 0.9rem;
        line-height: 1.4;
        color: #333;
        flex-grow: 1;
      }
    }
  }

  .loading {
    text-align: center;
    padding: 2rem;
    color: #555;
  }
</style>
