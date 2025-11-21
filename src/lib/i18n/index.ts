import { register, init, getLocaleFromNavigator, locale } from 'svelte-i18n';
import { browser } from '$app/environment';

register('en', () => import('./en.json'));
register('de', () => import('./de.json'));
register('el', () => import('./el.json'));
register('nl', () => import('./nl.json'));

init({
    fallbackLocale: 'en',
    initialLocale: browser ? getLocaleFromNavigator() : 'en'
});

// ✅ Only run localStorage logic in the browser
if (browser) {
    const saved = localStorage.getItem('locale');

    if (saved) {
        locale.set(saved);
    }

    locale.subscribe(value => {
        if (value) {
            localStorage.setItem('locale', value);
        }
    });
}
