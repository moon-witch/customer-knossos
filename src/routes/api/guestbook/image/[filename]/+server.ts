import type { RequestHandler } from './$types';
import { minio, BUCKET } from '$lib/utils/minio';

export const GET: RequestHandler = async ({ params }) => {
    const { filename } = params;

    const stream = await minio.getObject(BUCKET, filename);

    return new Response(stream as unknown as ReadableStream, {
        headers: {
            'Content-Type': 'image/jpeg',
            'Cache-Control': 'public, max-age=86400'
        }
    });
};
