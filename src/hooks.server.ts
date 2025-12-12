import {setupI18N} from "$lib/i18n";

export async function handle({ event, resolve }) {
    // Get locale from browser header on server-side render
    let locale = event.request.headers.get('accept-language') ?? undefined;

    if (locale) {
        locale = locale.split(',')[0]
    }

    await setupI18N(locale);
    return resolve(event);
};
