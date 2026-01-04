import { getStocks } from '$lib/server';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
    // Initial data for SSR and first render
    const initialStocks = await getStocks();

    return {
        initialStocks
    };
};
