<script lang="ts">
    import { locale } from 'svelte-i18n';
    import { onClickOutside } from './useClickOutside';

    let open = false;

    const languages = [
        { code: 'en', label: 'English', flag: '🇬🇧' },
        { code: 'de', label: 'Deutsch', flag: '🇩🇪' },
        { code: 'el', label: 'Ελληνικά', flag: '🇬🇷' },
        { code: 'nl', label: 'Nederlands', flag: '🇳🇱'}
    ];

    $: current = languages.find(l => l.code === $locale) || languages[0];

    function toggle() {
        open = !open;
    }

    function selectLanguage(code: string) {
        locale.set(code);
        localStorage.setItem('locale', code);
        open = false;
    }

    let container: HTMLDivElement;
</script>

<div class="flag-switcher" bind:this={container} use:onClickOutside={() => open = false}>
    <button class="active-flag" on:click={toggle} aria-label="Change language">
        <span class="flag">{current.flag}</span>
    </button>

    {#if open}
        <div class="flag-dropdown">
            {#each languages as lang}
                <button
                        class:active={$locale === lang.code}
                        on:click={() => selectLanguage(lang.code)}
                        aria-label={`Switch to ${lang.label}`}
                >
                    <span class="flag">{lang.flag}</span>
                </button>
            {/each}
        </div>
    {/if}
</div>

<style lang="scss">
  .flag-switcher {
    position: relative;
  }

  .active-flag {
    background: transparent;
    border: none;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    cursor: pointer;
    font-size: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .flag-dropdown {
    position: absolute;
    top: 110%;
    right: 0;
    background: #f7f4ef;
    border: 1px solid $primary;
    border-radius: 10px;
    padding: 0.4rem;
    display: flex;
    gap: 0.4rem;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
    z-index: 50;
  }

  .flag-dropdown button {
    background: transparent;
    border: none;
    font-size: 1.3rem;
    cursor: pointer;
    padding: 0.3rem;
    border-radius: 6px;
    transition: background 0.2s ease;
  }

  .flag-dropdown button:hover {
    background: rgba(124, 52, 33, 0.1);
  }

  .flag-dropdown button.active {
    background: rgba(124, 52, 33, 0.2);
  }
</style>
