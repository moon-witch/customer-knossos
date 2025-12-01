import type { RequestHandler } from '@sveltejs/kit';
import { minio, BUCKET } from '$lib/utils/minio';
import { db } from '$lib/server/db';
import { randomUUID } from 'crypto';
import { env } from '$env/dynamic/private';
import { containsUnsafeContent } from '$lib/utils/profanityFilter.ts';

/* GET ENTRIES */
export const GET: RequestHandler = async () => {
    const { rows } = await db.query(`
        SELECT id, name, message, image_url, created_at
        FROM guestbook_entries
        ORDER BY created_at DESC
    `);

    return new Response(JSON.stringify(rows), {
        headers: {
            'Content-Type': 'application/json'
        }
    });
};

/* POST ENTRY */
export const POST: RequestHandler = async ({ request }) => {
    const formData = await request.formData();

    const name = formData.get('name');
    const message = formData.get('message');
    const imageEntry = formData.get('image');
    const cf_token = formData.get('cf_token');

    if (!cf_token || typeof cf_token !== 'string') {
        return new Response('Missing Turnstile token', { status: 400 });
    }

    /* -------------------------------------------------------
       Turnstile verification
       ------------------------------------------------------- */
    const verifyRes = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
        method: 'POST',
        body: new URLSearchParams({
            secret: env.TURNSTILE_SECRET_KEY!,
            response: cf_token
        })
    });

    const out = await verifyRes.json();

    if (!out.success) {
        return new Response('Turnstile verification failed', { status: 403 });
    }

    if (typeof name !== 'string' || typeof message !== 'string') {
        return new Response('Name and message required', { status: 400 });
    }

    /* -------------------------------------------------------
       Profanity + Injection Filter
       ------------------------------------------------------- */
    if (containsUnsafeContent(name) || containsUnsafeContent(message)) {
        return new Response('Inappropriate or unsafe content detected', {
            status: 400
        });
    }

    let imageFilename: string | null = null;

    if (imageEntry instanceof File && imageEntry.size > 0) {
        const buffer = Buffer.from(await imageEntry.arrayBuffer());
        const filename = `${randomUUID()}-${imageEntry.name}`;

        await minio.putObject(
            BUCKET,
            filename,
            buffer,
            imageEntry.size,
            { 'Content-Type': imageEntry.type }
        );

        imageFilename = filename;
    }

    const { rows } = await db.query(
        `INSERT INTO guestbook_entries (name, message, image_url)
         VALUES ($1, $2, $3)
         RETURNING *`,
        [name, message, imageFilename]
    );

    return new Response(JSON.stringify(rows[0]), {
        status: 201,
        headers: { 'Content-Type': 'application/json' }
    });
};

/* DELETE ENTRY */
export const DELETE: RequestHandler = async ({ url }) => {
    const id = url.searchParams.get('id');
    const keyword = url.searchParams.get('keyword');

    if (keyword !== 'Taverna_Knossos_Admin_2026') {
        return new Response('Wrong keyword', { status: 400 });
    }

    if (!id) {
        return new Response('Missing id', { status: 400 });
    }

    const { rows } = await db.query<{ image_url: string | null }>(
        'SELECT image_url FROM guestbook_entries WHERE id = $1',
        [id]
    );

    if (rows.length === 0) {
        return new Response('Not found', { status: 404 });
    }

    const filename = rows[0].image_url;

    if (filename) {
        await minio.removeObject(BUCKET, filename);
    }

    await db.query('DELETE FROM guestbook_entries WHERE id = $1', [id]);

    return new Response('Deleted', { status: 200 });
};
