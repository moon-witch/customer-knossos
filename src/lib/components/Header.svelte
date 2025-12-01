<script lang="ts">
    import { onMount } from 'svelte';
    import { animate } from 'animejs';
    import KnossosSpiral from "$lib/components/KnossosSpiral.svelte";
    import MenuOverlay from "$lib/components/MenuOverlay.svelte";
    import CTAMenu from "$lib/components/buttons/CTAMenu.svelte";
    import { _ } from 'svelte-i18n';
    import CTAGuestbook from "$lib/components/buttons/CTAGuestbook.svelte";

    let menuOverlay: MenuOverlay;
    let headerEl: HTMLDivElement;

    function openMenu() {
        menuOverlay.openOverlay();
    }

    let isAnimating = false;

    function runTypewriter() {
        if (isAnimating) return;
        isAnimating = true;

        const titles = Array.from(
            headerEl.querySelectorAll<HTMLHeadingElement>('.name')
        );

        const texts = titles.map(el => {
            const text = el.dataset.original || el.textContent || '';
            el.dataset.original = text;
            return text;
        });

        // Lock sizes to prevent layout shift
        titles.forEach(el => {
            const { width, height } = el.getBoundingClientRect();
            el.style.width = `${width}px`;
            el.style.height = `${height}px`;
            el.style.display = 'inline-block';
        });

        // Instantly hide both words
        titles.forEach(el => {
            el.textContent = '';
            el.style.opacity = '0';
        });

        titles.forEach((el, index) => {
            const state = { progress: 0 };
            const text = texts[index];

            animate(state, {
                progress: [0, 1],
                duration: text.length * 70,
                delay: index * 500, // ✅ 0.5s stagger
                easing: 'linear',
                onUpdate: () => {
                    const chars = Math.floor(state.progress * text.length);
                    el.textContent = text.substring(0, chars);
                    el.style.opacity = state.progress.toString();
                },
                complete: () => {
                    el.textContent = text;
                    el.style.opacity = '1';

                    if (index === titles.length - 1) {
                        isAnimating = false;
                    }
                }
            });
        });
    }





    onMount(() => {
        runTypewriter();
    });
</script>



<div class="header-container">
    <div class="header" bind:this={headerEl} on:mouseenter={runTypewriter}>
        <h1 class="name">TAVERNA</h1>
        <h1 class="name">KNOSSOS</h1>
    </div>

    <div class="place">Malia</div>
    <p>{$_('header.info')}</p>
    <div class="spiral">
        <KnossosSpiral />
    </div>
    <div class="cta-menu-button">
        <CTAMenu on:open={openMenu} />
        <CTAGuestbook />
    </div>
    <MenuOverlay bind:this={menuOverlay} />
</div>

<style lang="scss">
  .header-container {
    background: $background;
    color: #7c3421;
    height: 100dvh;
    width: 30dvw;

    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    text-align: center;

    @media (max-width: 768px) {
      width: 100%;
      height: 50dvh;
    }
  }

  .header {
    display: flex;
    flex-direction: column;
    align-items: center;
    line-height: 1;
    margin-top: 4rem;

    @media (max-width: 768px) {
      display: none;
    }

    h1 {
      margin: 0;
    }
  }

  .name {
    font-family: 'Gelio Pasteli', sans-serif;
    font-size: 72px;
    letter-spacing: 2px;

    @media (max-width: 768px) {
      display: none;
    }
  }

  .place {
    font-family: 'Gelio Pasteli', sans-serif;
    font-size: 28px;
    margin-top: 0.5rem;
    margin-bottom: 0;
    letter-spacing: 1.5px;

    @media (min-width: 768px) {
      font-size: 38px;
      margin-bottom: 2rem;
    }
  }

  p {
    max-width: 340px;
    font-size: 1rem;
    line-height: 1.45;
    opacity: 0.9;

    @media (min-width: 768px) {
      font-size: 1.1rem;
      max-width: 380px;
    }
  }

  .spiral {
    margin-top: 0;
    margin-bottom: 2rem;

    @media (min-width: 768px) {
      margin-top: 1rem;
      margin-bottom: 3rem;
    }

    svg {
      width: 80px;
      height: 80px;

      @media (min-width: 768px) {
        width: 100px;
        height: 100px;
      }
    }
  }

  .cta-menu-button {
    margin-bottom: 3rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    align-items: center;
    justify-content: center;


    button {
      font-size: 1rem;

      @media (min-width: 768px) {
        font-size: 1.1rem;
      }
    }
  }
</style>