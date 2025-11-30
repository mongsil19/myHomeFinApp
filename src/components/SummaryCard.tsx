import React from 'react';
import { RefreshCw } from 'lucide-react';
import clsx from 'clsx';
import type { Currency } from '../types';

interface SummaryCardProps {
    totalValue: number;
    totalProfitLoss: number;
    totalReturnRate: number;
    currency: Currency;
    onCurrencyToggle?: () => void;
    showCurrencyToggle?: boolean;
}

/**
 * SummaryCard Component
 * 
 * Displays the key financial metrics for the selected asset module.
 * - Total Valuation
 * - Profit/Loss Amount
 * - Return Rate (%)
 * 
 * Features:
 * - Supports currency toggling (KRW <-> USD) for overseas stocks.
 * - Dynamically colors profit (Red) and loss (Blue).
 */
const SummaryCard: React.FC<SummaryCardProps> = ({
    totalValue,
    totalProfitLoss,
    totalReturnRate,
    currency,
    onCurrencyToggle,
    showCurrencyToggle = false,
}) => {
    const isPositive = totalReturnRate >= 0;

    return (
        <div className="px-5 py-6 bg-white">
            <div className="flex flex-col gap-1">
                <span className="text-sm text-gray-500 font-medium">총 평가 금액</span>
                <div className="flex items-center justify-between">
                    <h2 className="text-3xl font-bold text-gray-900">
                        {currency === 'USD' ? '$' : ''}
                        {totalValue.toLocaleString()}
                        {currency === 'KRW' ? '원' : ''}
                    </h2>

                    {/* Currency Toggle Button (Visible only when showCurrencyToggle is true) */}
                    {showCurrencyToggle && (
                        <button
                            onClick={onCurrencyToggle}
                            className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
                        >
                            <RefreshCw size={14} className="text-gray-600" />
                            <span className="text-xs font-semibold text-gray-600">
                                {currency === 'KRW' ? 'USD' : 'KRW'}
                            </span>
                        </button>
                    )}
                </div>

                {/* Profit/Loss Display */}
                <div className="flex items-center gap-2 mt-1">
                    <span className={clsx(
                        "text-sm font-semibold flex items-center gap-0.5",
                        isPositive ? "text-red-500" : "text-blue-500" // Red for profit, Blue for loss
                    )}>
                        {totalProfitLoss > 0 ? '+' : ''}
                        {currency === 'USD' ? '$' : ''}
                        {totalProfitLoss.toLocaleString()}
                        {currency === 'KRW' ? '원' : ''}
                        {' '}
                        ({totalReturnRate.toFixed(1)}%)
                    </span>
                    <span className="text-xs text-gray-400">지난달보다 {isPositive ? '증가' : '감소'}</span>
                </div>
            </div>
        </div>
    );
};

export default SummaryCard;
