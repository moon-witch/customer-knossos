import { json } from '@sveltejs/kit';
import { GOOGLE_MAPS_API } from '$env/static/private';

export async function GET() {
    try {
        const query = 'Knossos Taverna Malia';

        // Step 1: find Place ID
        const findUrl = new URL('https://maps.googleapis.com/maps/api/place/findplacefromtext/json');
        findUrl.search = new URLSearchParams({
            input: query,
            inputtype: 'textquery',
            fields: 'place_id',
            key: GOOGLE_MAPS_API
        }).toString();

        const findRes = await fetch(findUrl);
        const findJson = await findRes.json();
        const placeId = findJson.candidates?.[0]?.place_id;
        if (!placeId) return json({ error: 'Place not found' }, { status: 404 });

        // Step 2: details — include reviews
        const detailsUrl = new URL('https://maps.googleapis.com/maps/api/place/details/json');
        detailsUrl.search = new URLSearchParams({
            place_id: placeId,
            fields: 'name,rating,user_ratings_total,formatted_address,url,reviews',
            key: GOOGLE_MAPS_API
        }).toString();

        const detailsRes = await fetch(detailsUrl);
        const detailsJson = await detailsRes.json();
        const place = detailsJson.result;
        if (!place) return json({ error: 'No details found' }, { status: 404 });

        // Extract up to 5 reviews
        const reviews = (place.reviews || []).slice(0, 5).map((r: any) => ({
            author: r.author_name,
            rating: r.rating,
            time: r.relative_time_description,
            text: r.text,
            profile_photo: r.profile_photo_url,
            link: r.author_url
        }));

        return json({
            name: place.name,
            address: place.formatted_address,
            rating: place.rating,
            reviews_count: place.user_ratings_total,
            link: place.url,
            top_reviews: reviews
        });
    } catch (error) {
        console.error(error);
        return json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
