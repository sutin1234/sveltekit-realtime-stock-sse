import { LOGO_DEV_PUBLIC_KEY } from '$lib/constants';
import type { Stock } from '$lib/types';

const BASE_STOCKS: Stock[] = [
    {
        ticker: 'GOOGL',
        company: 'Alphabet',
        price: 313.0,
        marketCap: '3.8T',
        ps: 9.81,
        pe: 31.31,
        change1y: 65.23,
        high52w: -4.81,
        sma: [1, 1, 1],
        logo: `https://img.logo.dev/google.com?token=${LOGO_DEV_PUBLIC_KEY}`,
        priceHistory: Array.from({ length: 20 }, () => 313.0 + (Math.random() - 0.5) * 10)
    },
    {
        ticker: 'AVGO',
        company: 'Broadcom',
        price: 346.1,
        marketCap: '1.6T',
        ps: 25.69,
        pe: 72.63,
        change1y: 49.19,
        high52w: -16.52,
        sma: [1, 1, 1],
        logo: `https://img.logo.dev/broadcom.com?token=${LOGO_DEV_PUBLIC_KEY}`,
        priceHistory: Array.from({ length: 20 }, () => 346.1 + (Math.random() - 0.5) * 10)
    },
    {
        ticker: 'LLY',
        company: 'Eli Lilly',
        price: 1074.68,
        marketCap: '1.0T',
        ps: 17.1,
        pe: 52.55,
        change1y: 38.12,
        high52w: -3.36,
        sma: [1, 1, 1],
        logo: `https://img.logo.dev/lilly.com?token=${LOGO_DEV_PUBLIC_KEY}`,
        priceHistory: Array.from({ length: 20 }, () => 1074.68 + (Math.random() - 0.5) * 20)
    },
    {
        ticker: 'CRM',
        company: 'Salesforce',
        price: 264.91,
        marketCap: '248.2B',
        ps: 6.16,
        pe: 35.32,
        change1y: -19.88,
        high52w: -27.84,
        sma: [0, 0, 1],
        logo: `https://img.logo.dev/salesforce.com?token=${LOGO_DEV_PUBLIC_KEY}`,
        priceHistory: Array.from({ length: 20 }, () => 264.91 + (Math.random() - 0.5) * 5)
    },
    {
        ticker: 'CVNA',
        company: 'Carvana',
        price: 422.02,
        marketCap: '91.8B',
        ps: 5.03,
        pe: 96.24,
        change1y: 111.48,
        high52w: -13.04,
        sma: [0, 0, 1],
        logo: `https://img.logo.dev/carvana.com?token=${LOGO_DEV_PUBLIC_KEY}`,
        priceHistory: Array.from({ length: 20 }, () => 422.02 + (Math.random() - 0.5) * 10)
    },
    {
        ticker: 'SBUX',
        company: 'Starbucks',
        price: 84.21,
        marketCap: '95.8B',
        ps: 2.58,
        pe: 51.7,
        change1y: -8.64,
        high52w: -28.31,
        sma: [0, 0, 0],
        logo: `https://img.logo.dev/starbucks.com?token=${LOGO_DEV_PUBLIC_KEY}`,
        priceHistory: Array.from({ length: 20 }, () => 84.21 + (Math.random() - 0.5) * 2)
    },
    {
        ticker: 'MSFT',
        company: 'Microsoft',
        price: 415.50,
        marketCap: '3.1T',
        ps: 13.2,
        pe: 36.5,
        change1y: 52.1,
        high52w: -2.1,
        sma: [1, 1, 1],
        logo: `https://img.logo.dev/microsoft.com?token=${LOGO_DEV_PUBLIC_KEY}`,
        priceHistory: Array.from({ length: 20 }, () => 415.50 + (Math.random() - 0.5) * 5)
    },
    {
        ticker: 'AAPL',
        company: 'Apple',
        price: 189.30,
        marketCap: '2.9T',
        ps: 7.8,
        pe: 28.4,
        change1y: 25.4,
        high52w: -5.2,
        sma: [1, 0, 1],
        logo: `https://img.logo.dev/apple.com?token=${LOGO_DEV_PUBLIC_KEY}`,
        priceHistory: Array.from({ length: 20 }, () => 189.30 + (Math.random() - 0.5) * 3)
    },
    {
        ticker: 'NVDA',
        company: 'NVIDIA',
        price: 875.25,
        marketCap: '2.2T',
        ps: 35.4,
        pe: 75.2,
        change1y: 220.5,
        high52w: -1.5,
        sma: [1, 1, 1],
        logo: `https://img.logo.dev/nvidia.com?token=${LOGO_DEV_PUBLIC_KEY}`,
        priceHistory: Array.from({ length: 20 }, () => 875.25 + (Math.random() - 0.5) * 15)
    },
    {
        ticker: 'AMZN',
        company: 'Amazon',
        price: 178.15,
        marketCap: '1.8T',
        ps: 3.2,
        pe: 60.1,
        change1y: 75.3,
        high52w: -3.8,
        sma: [1, 1, 1],
        logo: `https://img.logo.dev/amazon.com?token=${LOGO_DEV_PUBLIC_KEY}`,
        priceHistory: Array.from({ length: 20 }, () => 178.15 + (Math.random() - 0.5) * 3)
    },
    {
        ticker: 'META',
        company: 'Meta',
        price: 495.60,
        marketCap: '1.2T',
        ps: 9.5,
        pe: 32.1,
        change1y: 165.2,
        high52w: -4.1,
        sma: [1, 1, 1],
        logo: `https://img.logo.dev/meta.com?token=${LOGO_DEV_PUBLIC_KEY}`,
        priceHistory: Array.from({ length: 20 }, () => 495.60 + (Math.random() - 0.5) * 8)
    },
    {
        ticker: 'TSLA',
        company: 'Tesla',
        price: 175.35,
        marketCap: '550.2B',
        ps: 6.5,
        pe: 42.8,
        change1y: -15.4,
        high52w: -35.2,
        sma: [0, 0, 0],
        logo: `https://img.logo.dev/tesla.com?token=${LOGO_DEV_PUBLIC_KEY}`,
        priceHistory: Array.from({ length: 20 }, () => 175.35 + (Math.random() - 0.5) * 5)
    },
    {
        ticker: 'AMD',
        company: 'AMD',
        price: 178.50,
        marketCap: '280.5B',
        ps: 10.2,
        pe: 150.5,
        change1y: 95.2,
        high52w: -12.5,
        sma: [0, 1, 1],
        logo: `https://img.logo.dev/amd.com?token=${LOGO_DEV_PUBLIC_KEY}`,
        priceHistory: Array.from({ length: 20 }, () => 178.50 + (Math.random() - 0.5) * 4)
    },
    {
        ticker: 'NFLX',
        company: 'Netflix',
        price: 615.20,
        marketCap: '265.4B',
        ps: 8.1,
        pe: 45.2,
        change1y: 85.4,
        high52w: -2.5,
        sma: [1, 1, 1],
        logo: `https://img.logo.dev/netflix.com?token=${LOGO_DEV_PUBLIC_KEY}`,
        priceHistory: Array.from({ length: 20 }, () => 615.20 + (Math.random() - 0.5) * 10)
    },
    {
        ticker: 'INTC',
        company: 'Intel',
        price: 42.15,
        marketCap: '178.5B',
        ps: 3.5,
        pe: 95.2,
        change1y: 35.2,
        high52w: -15.2,
        sma: [0, 0, 1],
        logo: `https://img.logo.dev/intel.com?token=${LOGO_DEV_PUBLIC_KEY}`,
        priceHistory: Array.from({ length: 20 }, () => 42.15 + (Math.random() - 0.5) * 1)
    }
];

// Initialize visible stocks with mutable state
let currentStocks = structuredClone(BASE_STOCKS);

export async function getStocks(): Promise<Stock[]> {
    // Simulate market fluctuation on the server side with persistent state
    currentStocks = currentStocks.map((stock) => {
        // High volatility to force re-sorting: 5-10% change
        const volatility = 0.1;
        const change = (Math.random() - 0.5) * 2 * (stock.price * volatility);

        let newPrice = stock.price + change;
        // Ensure price stays positive
        if (newPrice < 1) newPrice = 1;

        newPrice = Number(newPrice.toFixed(2));

        // Update price history (keep last 20 points)
        const newHistory = [...stock.priceHistory, newPrice].slice(-20);

        return {
            ...stock,
            price: newPrice,
            priceHistory: newHistory
        };
    });

    return currentStocks;
}
