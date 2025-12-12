import {register, init, getLocaleFromNavigator} from 'svelte-i18n';

export const setupI18N = async (locale? : string) => {
    register('en', () => import('./en.json'));
    register('de', () => import('./de.json'));
    register('el', () => import('./el.json'));
    register('nl', () => import('./nl.json'));

    await init({
        fallbackLocale: 'en',
        initialLocale: locale ?? getLocaleFromNavigator()
    });
}