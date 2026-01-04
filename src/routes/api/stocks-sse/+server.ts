import { getStocks } from '$lib/server/stocks';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async () => {
    const stream = new ReadableStream({
        async start(controller) {

            // Send initial data immediately
            const initialStocks = await getStocks();
            controller.enqueue(`data: ${JSON.stringify(initialStocks)}\n\n`);

            const interval = setInterval(async () => {
                try {
                    const stocks = await getStocks();
                    const data = JSON.stringify(stocks);
                    controller.enqueue(`data: ${data}\n\n`);
                } catch (error) {
                    clearInterval(interval);
                }
            }, 1000);

            return () => {
                clearInterval(interval);
            };
        },
        cancel() {
            // This runs when the stream is canceled (client disconnects)
            // Cleanup is handled in the start return function or here if we needed to access the interval explicitly outside
        }
    });

    return new Response(stream, {
        headers: {
            'Content-Type': 'text/event-stream',
            'Cache-Control': 'no-cache',
            'Connection': 'keep-alive'
        }
    });
};
