import { Client } from 'minio';
import {
    MINIO_ENDPOINT,
    MINIO_PORT,
    MINIO_USE_SSL,
    MINIO_ACCESS_KEY,
    MINIO_SECRET_KEY,
    MINIO_BUCKET
} from '$env/static/private';

export const minio = new Client({
    endPoint: MINIO_ENDPOINT!,
    port: parseInt(MINIO_PORT || '443'),
    useSSL: MINIO_USE_SSL === 'true',
    accessKey: MINIO_ACCESS_KEY!,
    secretKey: MINIO_SECRET_KEY!
});

export const BUCKET = MINIO_BUCKET!;

