<script lang="ts">
    import { _ } from 'svelte-i18n';
</script>

<a href="/guestbook" class="menu-button">
    {$_('header.cta.guestbook')}
</a>

<style lang="scss">
  .menu-button {
    border: 3px solid $primary;
    border-radius: 4px;
    background: $background;
    padding: .5rem 1rem;
    color: $primary;
    font-family: "Gelio Greek Diner", sans-serif;
    font-size: 1.5rem;
    cursor: pointer;
    outline: 1px solid $primary;
    transition: outline 0.1s;
    text-decoration: none;

    @media (min-width: 768px) {
      font-size: 2.5rem;
      padding: 1rem 2rem;
    }

    &:hover {
      outline: 3px solid $primary;
    }
  }
</style>
