/**
 * Currency Type
 * - 'KRW': Korean Won
 * - 'USD': US Dollar
 */
export type Currency = 'KRW' | 'USD';

/**
 * Stock Interface
 * Represents a single stock holding.
 */
export interface Stock {
    id: string;
    name: string;
    ticker: string;
    currentPrice: number; // The price in the stock's native currency (KRW or USD)
    currency: Currency;   // The native currency of the stock
    quantity: number;     // Number of shares held
    avgPrice: number;     // Average buy price in native currency
    changeRate: number;   // Daily change percentage (e.g., 2.5 for +2.5%)
    logoUrl?: string;     // Optional URL for the stock logo
}

/**
 * AssetHistory Interface
 * Represents a data point for the asset trend chart.
 */
export interface AssetHistory {
    date: string;  // Date string (e.g., '2023-11-01')
    value: number; // Total asset value in KRW at that date
}

/**
 * PortfolioSummary Interface
 * Represents the aggregated financial status.
 */
export interface PortfolioSummary {
    totalValue: number;      // Total current valuation
    totalProfitLoss: number; // Total profit or loss amount
    totalReturnRate: number; // Total return percentage
}
