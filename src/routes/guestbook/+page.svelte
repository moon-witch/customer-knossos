<script lang="ts">
    import { onMount } from 'svelte';
    import GuestbookModal from '$lib/components/GuestbookModal.svelte';
    import Footer from "$lib/components/Footer.svelte";
    import { _ } from 'svelte-i18n';

    type GuestbookEntry = {
        id: string;
        name: string;
        message: string;
        image_url: string | null;
        created_at: string;
    };

    let entries: GuestbookEntry[] = [];
    let loading = true;
    let modalOpen = false;
    let deletingId: string | null = null;
    let keyword = '';

    async function loadEntries() {
        loading = true;
        const res = await fetch('/api/guestbook');
        if (res.ok) {
            entries = await res.json();
        }
        loading = false;
    }

    async function deleteEntry(id: string) {
        if (!confirm('Delete this entry?')) return;

        deletingId = id;

        const res = await fetch(`/api/guestbook?id=${id}&keyword=${keyword}`, {
            method: 'DELETE'
        });

        if (res.ok) {
            entries = entries.filter(e => e.id !== id);
        }

        deletingId = null;
    }

    onMount(loadEntries);
</script>

<section class="guestbook">
    <a href="/" class="back-button" aria-label="Back to homepage">← {$_('guestbook.back')}</a>
    <header class="guestbook-header">
        <h1>{$_('guestbook.headline')}</h1>
        <p>{$_('guestbook.info')}</p>

        <button class="cta" on:click={() => modalOpen = true}>
            {$_('guestbook.cta')}
        </button>
    </header>

    {#if loading}
        <p class="status">{$_('guestbook.loading')}</p>
    {:else if entries.length === 0}
        <p class="status">No entries yet. Be the first to leave a message.</p>
    {:else}
        <div class="wall">
            {#each entries as entry}
                <article class="note-horizontal">

                    {#if keyword.length > 15}
                    <button
                            class="delete"
                            disabled={deletingId === entry.id}
                            on:click={() => deleteEntry(entry.id)}
                            title="Delete entry">
                        ✕
                    </button>
                        {/if}

                    <div class="note-left">
                        <span class="datetime">
  {new Date(entry.created_at).toLocaleString(undefined, {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
  })}
</span>

                        <span class="name">{entry.name}</span>
                        <p class="message">{entry.message}</p>
                    </div>

                    {#if entry.image_url}
                        <div class="note-right">
                            <img
                                    src={`/api/guestbook/image/${entry.image_url}`}
                                    alt="guestbook"
                                    width="75"
                                    height="75" />
                        </div>
                    {/if}
                </article>
            {/each}
        </div>
    {/if}
</section>
<div>
    <input type="text" bind:value={keyword} class="keyword" />
</div>
<Footer />

<GuestbookModal open={modalOpen} on:close={() => { modalOpen = false; loadEntries(); }} />

<style lang="scss">
    .guestbook {
        position: relative;
        padding-top: 3rem;
        background: $background;
    }

    .back-button {
        position: absolute;
        top: 1.2rem;
        left: 1.2rem;
        display: inline-flex;
        align-items: center;
        gap: 0.25rem;
        font-size: 0.85rem;
        text-decoration: none;
        color: $primary;
        background: rgba(247, 244, 239, 0.9);
        padding: 0.4rem 0.8rem;
        border-radius: 999px;
        box-shadow: 0 4px 10px rgba(0,0,0,0.08);
        transition: transform 0.15s ease, box-shadow 0.15s ease;
    }

    .back-button:hover {
        transform: translateY(-1px);
        box-shadow: 0 6px 14px rgba(0,0,0,0.12);
    }

    .guestbook-header {
        text-align: center;
        margin-bottom: 2.5rem;
    }

    .guestbook-header h1 {
        margin: 0;
      font-family: "Gelio Pasteli", sans-serif;
      font-size: 3rem;
    }

    .guestbook-header p {
        opacity: 0.8;
        margin: 0.5rem 0 1.5rem;
    }

    .cta {
        background: #7c3421;
        color: white;
        border: none;
        padding: 0.75rem 1.6rem;
        border-radius: 999px;
        font-size: 0.95rem;
        cursor: pointer;
        box-shadow: 0 8px 20px rgba(124, 52, 33, 0.3);
        transition: transform 0.2s ease, box-shadow 0.2s ease;
    }

    .cta:hover {
        transform: translateY(-2px);
        box-shadow: 0 12px 26px rgba(124, 52, 33, 0.4);
    }

    .status {
        text-align: center;
        opacity: 0.7;
    }

    .wall {
        position: relative;
        display: flex;
        flex-wrap: wrap;
        gap: 1.8rem;
        justify-content: center;
      padding-top: 3rem;
      background-image: url("../../lib/assets/images/wood.jpg");
      background-size: cover;
      min-height: 76dvh;
    }

    .note-horizontal {
        position: relative;
      min-width: 200px;
      max-width: 400px;
      height: fit-content;
        display: flex;
        justify-content: space-between;
        align-items: center;
      gap: 2rem;
        background: #fffdf8;
        padding: 1rem 1.2rem;
        border-radius: 14px;
        box-shadow:
                0 10px 25px rgba(0, 0, 0, 0.12),
                0 2px 0 rgba(0, 0, 0, 0.04);
        transform: rotate(var(--rotation)) translateY(var(--offset));
        transition: transform 0.3s ease, box-shadow 0.3s ease;
    }

    .note-horizontal:hover {
        transform: rotate(0deg) scale(1.03);
        box-shadow: 0 14px 30px rgba(0, 0, 0, 0.16);
        z-index: 2;
    }

    /* Sticker randomness */
    .note-horizontal:nth-child(odd) {
        --rotation: -4deg;
        --offset: 4px;
    }

    .note-horizontal:nth-child(even) {
        --rotation: 3deg;
        --offset: -6px;
    }

    .note-horizontal:nth-child(3n) {
        --rotation: 6deg;
        --offset: 8px;
    }

    .note-horizontal:nth-child(4n) {
        --rotation: -6deg;
        --offset: -4px;
    }

    .note-left {
        display: flex;
        flex-direction: column;
        gap: 0.25rem;
        max-width: calc(100% - 90px);
    }

    .note-right img {
        width: 150px;
        height: 150px;
        object-fit: cover;
        border-radius: 10px;
    }

    .datetime {
        font-size: 0.7rem;
        color: rgba(0, 0, 0, 0.5);
        margin-bottom: 0.2rem;
    }

    .name {
        font-weight: 600;
        font-size: 0.95rem;
        color: #7c3421;
    }

    .message {
        font-size: 0.9rem;
        line-height: 1.4;
        margin: 0.3rem 0 0;
    }

    .delete {
        position: absolute;
        top: 6px;
        right: 6px;
        border: none;
        background: rgba(124, 52, 33, 0.9);
        color: white;
        width: 22px;
        height: 22px;
        border-radius: 50%;
        cursor: pointer;
        font-size: 13px;
        line-height: 22px;
        text-align: center;
    }

    .delete:hover:not(:disabled) {
        background: #a3472e;
    }

    .delete:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }

    .keyword {
      position: fixed;
      width: 10px;
      outline: none;
        bottom: 1rem;
        right: 1rem;
        padding: 0.5rem 1rem;
        border-radius: 999px;
        border: none;
        background: rgba(255, 255, 255, 0.1);
        color: #7c3421;
    }
</style>
