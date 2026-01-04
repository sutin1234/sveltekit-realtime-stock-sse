export interface Stock {
    ticker: string;
    company: string;
    price: number;
    marketCap: string;
    ps: number;
    pe: number | null;
    change1y: number;
    high52w: number;
    sma: number[];
    logo: string;
    priceHistory: number[];
}
