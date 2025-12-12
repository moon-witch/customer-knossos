import {setupI18N} from "$lib/i18n";

await setupI18N()

export async function handle({resolve}) {
    await setupI18N();
    return resolve();
}
