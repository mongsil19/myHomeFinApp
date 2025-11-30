import React from 'react';
import clsx from 'clsx';
import type { Stock } from '../types';

interface StockItemProps {
    stock: Stock;
    exchangeRate: number;
    currencyMode: 'KRW' | 'USD';
}

/**
 * StockItem Component
 * 
 * Represents a single stock row in the list.
 * - Displays basic info (Logo, Name, Price, Change).
 * - Expandable: Click to reveal detailed info (Quantity, Avg Price, Valuation, P/L).
 * - Handles currency conversion for display.
 */
const StockItem: React.FC<StockItemProps> = ({ stock, exchangeRate, currencyMode }) => {
    const [isExpanded, setIsExpanded] = React.useState(false);

    // Calculate values based on currency mode
    const isUSD = currencyMode === 'USD';

    // Helper to calculate display price based on currency mode and stock's native currency
    const calculatePrice = (price: number) => {
        // Case 1: Stock is USD, Display is KRW -> Convert to KRW
        if (stock.currency === 'USD' && !isUSD) {
            return Math.floor(price * exchangeRate);
        }
        // Case 2: Stock is KRW, Display is USD -> Convert to USD
        if (stock.currency === 'KRW' && isUSD) {
            return price / exchangeRate;
        }
        // Case 3: Same currency -> No conversion
        return price;
    };

    const currentPrice = calculatePrice(stock.currentPrice);
    const avgPrice = calculatePrice(stock.avgPrice);
    const valuation = currentPrice * stock.quantity;
    const profitLoss = (currentPrice - avgPrice) * stock.quantity;

    const isPositive = stock.changeRate >= 0;
    const colorClass = isPositive ? 'text-red-500' : 'text-blue-500';

    // Helper to format numbers (decimals for USD, integers for KRW)
    const formatNumber = (num: number) => {
        if (isUSD) return num.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        return Math.floor(num).toLocaleString();
    };

    return (
        <div
            className="py-4 border-b border-gray-50 last:border-none cursor-pointer hover:bg-gray-50 transition-colors -mx-5 px-5"
            onClick={() => setIsExpanded(!isExpanded)}
        >
            <div className="flex items-center justify-between">
                {/* Left: Logo and Name */}
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-400 overflow-hidden">
                        {stock.logoUrl ? (
                            <img src={stock.logoUrl} alt={stock.name} className="w-full h-full object-cover" />
                        ) : (
                            stock.name.slice(0, 1)
                        )}
                    </div>
                    <div>
                        <h3 className="text-base font-semibold text-gray-900">{stock.name}</h3>
                        <span className="text-xs text-gray-400">{stock.ticker}</span>
                    </div>
                </div>

                {/* Right: Price and Change Rate */}
                <div className="text-right">
                    <div className="text-base font-semibold text-gray-900">
                        {isUSD ? '$' : ''}{formatNumber(currentPrice)}{!isUSD ? '원' : ''}
                    </div>
                    <div className={clsx("text-xs font-medium", colorClass)}>
                        {stock.changeRate > 0 ? '+' : ''}{stock.changeRate}%
                    </div>
                </div>
            </div>

            {/* Expanded Details Section */}
            {isExpanded && (
                <div className="mt-4 bg-gray-50 rounded-xl p-4 text-sm animate-in fade-in slide-in-from-top-1 duration-200">
                    <div className="flex justify-between mb-2">
                        <span className="text-gray-500">보유수량</span>
                        <span className="font-medium text-gray-900">{stock.quantity}주</span>
                    </div>
                    <div className="flex justify-between mb-2">
                        <span className="text-gray-500">평단가</span>
                        <span className="font-medium text-gray-900">
                            {isUSD ? '$' : ''}{formatNumber(avgPrice)}{!isUSD ? '원' : ''}
                        </span>
                    </div>
                    <div className="flex justify-between mb-2">
                        <span className="text-gray-500">평가금액</span>
                        <span className="font-medium text-gray-900">
                            {isUSD ? '$' : ''}{formatNumber(valuation)}{!isUSD ? '원' : ''}
                        </span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-500">손익</span>
                        <span className={clsx("font-medium", colorClass)}>
                            {profitLoss > 0 ? '+' : ''}
                            {isUSD ? '$' : ''}{formatNumber(profitLoss)}{!isUSD ? '원' : ''}
                        </span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default StockItem;
