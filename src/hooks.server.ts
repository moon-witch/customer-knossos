import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
    const proto = event.request.headers.get('x-forwarded-proto');
    const host = event.request.headers.get('x-forwarded-host');

    // Patch the URL so SvelteKit sees the correct origin (important for CSRF protection)
    if (proto && host) {
        const url = new URL(event.url);
        url.protocol = proto + ':';
        url.host = host;
        event.url = url;
    }

    return resolve(event);
};
