<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    import { _ } from 'svelte-i18n';

    const dispatch = createEventDispatcher();

    const MESSAGE_MAX_LENGTH = 500

    export let open = false;

    let name = '';
    let message = '';
    let image: File | null = null;
    let loading = false;
    let error = '';

    function close() {
        dispatch('close');
    }

    async function submit() {
        if (!name || !message) {
            error = 'Please provide your name and a message.';
            return;
        }

        loading = true;
        error = '';

        const formData = new FormData();
        formData.append('name', name);
        formData.append('message', message);
        if (image) formData.append('image', image);

        try {
            const res = await fetch('/api/guestbook', {
                method: 'POST',
                body: formData
            });

            if (!res.ok) throw new Error('Failed to submit entry');

            name = '';
            message = '';
            image = null;
            close();
        } catch (e) {
            error = 'Submission failed. Please try again.';
        } finally {
            loading = false;
        }
    }
</script>

{#if open}
    <div class="backdrop" on:click={close}></div>

    <div class="modal" role="dialog" aria-modal="true">
        <h2>{$_("guestbook.modal.headline")}</h2>

        {#if error}
            <p class="error">{error}</p>
        {/if}

        <form on:submit|preventDefault={submit}>
            <label>
                {$_("guestbook.modal.name")}
                <input type="text" bind:value={name} required />
            </label>

            <label>
                {$_("guestbook.modal.message")}
                <textarea rows="4" bind:value={message} required maxlength={MESSAGE_MAX_LENGTH}></textarea>
            </label>
            <div class="length">{message.length} / {MESSAGE_MAX_LENGTH}</div>

            <label>
                {$_("guestbook.modal.image")}
                <input type="file" accept="image/*" on:change={(e) => image = e.currentTarget.files?.[0] ?? null} />
            </label>

            <div class="actions">
                <button type="button" on:click={close}>{$_("guestbook.modal.cancel")}</button>
                <button type="submit" disabled={loading}>
                    {loading ? $_("guestbook.modal.loading") : $_("guestbook.modal.submit")}
                </button>
            </div>
        </form>
    </div>
{/if}

<style>
    .backdrop {
        position: fixed;
        inset: 0;
        background: rgba(0, 0, 0, 0.5);
        z-index: 1000;
    }

    .modal {
        position: fixed;
        inset: 50% auto auto 50%;
        transform: translate(-50%, -50%);
        background: #f7f4ef;
        border-radius: 16px;
        padding: 1.5rem;
        width: 90%;
        max-width: 420px;
        z-index: 1001;
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
    }

    h2 {
        margin: 0 0 1rem;
        font-family: "Gelio Pasteli", sans-serif;
        font-size: 2rem;
    }

    form {
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
    }

    label {
        display: flex;
        flex-direction: column;
        font-size: 0.9rem;
    }

    input,
    textarea {
        padding: 0.5rem;
        border-radius: 8px;
        border: 1px solid #ccc;
        font-size: 0.95rem;
    }

    .length {
        text-align: right;
        font-size: 0.8rem;
        color: gray;
    }

    .actions {
        display: flex;
        justify-content: space-between;
        margin-top: 1rem;
    }

    button {
        padding: 0.5rem 1rem;
        border-radius: 999px;
        border: none;
        cursor: pointer;
    }

    button[type='submit'] {
        background: #7c3421;
        color: white;
    }

    .error {
        color: #b00020;
        font-size: 0.85rem;
    }
</style>