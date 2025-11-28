<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    import { _ } from 'svelte-i18n';

    const dispatch = createEventDispatcher();

    function handleClick() {
        dispatch('open');
    }
</script>

<button class="menu-button" on:click={handleClick}>
    {$_('header.cta.menu')}
</button>

<style lang="scss">
  .menu-button {
    border: 3px solid $primary;
    border-radius: 4px;
    background: $background;
    padding: 1rem 2rem;
    color: $primary;
    font-family: "Gelio Greek Diner", sans-serif;
    font-size: 2rem;
    cursor: pointer;
    outline: 1px solid $primary;
    transition: outline 0.1s;

    @media (min-width: 768px) {
      font-size: 2.5rem;
    }

    &:hover {
      outline: 3px solid $primary;
    }
  }
</style>
