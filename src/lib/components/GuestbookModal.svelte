<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    import { onDestroy } from 'svelte';
    import { browser } from '$app/environment';
    import { _ } from 'svelte-i18n';
    import { PUBLIC_TURNSTILE_SITE_KEY } from '$env/static/public';

    const dispatch = createEventDispatcher();
    const MESSAGE_MAX_LENGTH = 500;

    export let open = false;

    let name = '';
    let message = '';
    let image: File | null = null;
    let loading = false;
    let error = '';
    let turnstileToken = '';

    let widgetId: any = null;
    let container: HTMLDivElement | null = null;

    // Load script only on client
    function loadTurnstileScript(): Promise<void> {
        if (!browser) return Promise.resolve();

        return new Promise<void>((resolve) => {
            if (window.turnstile) {
                resolve();
                return;
            }

            const script = document.createElement('script');
            script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
            script.async = true;
            script.onload = () => resolve();
            document.head.appendChild(script);
        });
    }

    async function renderTurnstile() {
        if (!browser) return;
        if (!container) return;

        await loadTurnstileScript();

        if (!window.turnstile) return;

        widgetId = window.turnstile.render(container, {
            sitekey: PUBLIC_TURNSTILE_SITE_KEY,
            callback: (token: string) => {
                turnstileToken = token;
            }
        });
    }

    function resetTurnstile() {
        if (!browser) return;
        if (window.turnstile && widgetId) {
            window.turnstile.remove(widgetId);
        }
        widgetId = null;
        turnstileToken = '';
    }

    // Reactively handle open/close without SSR crash
    $: if (browser && open) {
        setTimeout(() => renderTurnstile(), 0);
    } else if (browser && !open) {
        resetTurnstile();
    }

    onDestroy(() => {
        resetTurnstile();
    });

    function close() {
        dispatch('close');
    }

    async function submit() {
        if (!name || !message) {
            error = 'Please provide your name and a message.';
            return;
        }

        if (!turnstileToken) {
            error = 'Verification required. Please complete the Turnstile check.';
            return;
        }

        loading = true;
        error = '';

        const formData = new FormData();
        formData.append('name', name);
        formData.append('message', message);
        if (image) formData.append('image', image);
        formData.append('cf_token', turnstileToken);

        try {
            const res = await fetch('/api/guestbook', {
                method: 'POST',
                body: formData
            });

            if (!res.ok) throw new Error('Failed');

            name = '';
            message = '';
            image = null;
            turnstileToken = '';

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
        <h2>{$_('guestbook.modal.headline')}</h2>

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
                <textarea
                        rows="4"
                        bind:value={message}
                        required
                        maxlength={MESSAGE_MAX_LENGTH}
                ></textarea>
            </label>

            <div class="length">{message.length} / {MESSAGE_MAX_LENGTH}</div>

            <label>
                {$_("guestbook.modal.image")}
                <input
                        type="file"
                        accept="image/*"
                        on:change={(e) => (image = e.currentTarget.files?.[0] ?? null)}
                />
            </label>

            <!-- Turnstile -->
            <div bind:this={container}></div>

            <div class="actions">
                <button type="button" on:click={close}>
                    {$_("guestbook.modal.cancel")}
                </button>
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
