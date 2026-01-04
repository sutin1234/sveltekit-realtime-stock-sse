import { getStocks } from '$lib/server';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async () => {
    const stocks = await getStocks();
    return json(stocks);
};
