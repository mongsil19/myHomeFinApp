import React, { useState, useMemo } from 'react';
import Header from './Header';
import TabMenu from './TabMenu';
import SummaryCard from './SummaryCard';
import AssetChart from './AssetChart';
import StockList from './StockList';
import FAB from './FAB';
import { domesticStocks, overseasStocks, assetHistoryData } from '../data/mockData';
import type { Currency } from '../types';

/**
 * StockDashboard Component
 * 
 * The main view for the "Stocks" module.
 * It manages the state for:
 * - Active Tab (Domestic vs Overseas)
 * - Exchange Rate (for Overseas stocks)
 * - Currency Display Mode (KRW vs USD)
 */
const StockDashboard: React.FC = () => {
    // State for the active tab: 'domestic' (Domestic Stocks) or 'overseas' (Overseas Stocks)
    const [activeTab, setActiveTab] = useState<'domestic' | 'overseas'>('domestic');

    // State for the exchange rate (KRW per USD). Default is set to 1400.
    const [exchangeRate, setExchangeRate] = useState(1400);

    // State for the display currency. 'KRW' is default.
    const [currencyMode, setCurrencyMode] = useState<Currency>('KRW');

    // Effect: Reset currency mode to 'KRW' whenever the user switches to the 'domestic' tab.
    // Domestic stocks are always displayed in KRW.
    React.useEffect(() => {
        if (activeTab === 'domestic') {
            setCurrencyMode('KRW');
        }
    }, [activeTab]);

    // Determine which list of stocks to display based on the active tab.
    const currentStocks = activeTab === 'domestic' ? domesticStocks : overseasStocks;

    /**
     * Memoized calculation of the portfolio summary.
     * Recalculates only when stocks, exchange rate, or currency mode changes.
     */
    const summary = useMemo(() => {
        let totalValue = 0;
        let totalInvested = 0;

        currentStocks.forEach(stock => {
            let stockPrice = stock.currentPrice;
            let stockAvg = stock.avgPrice;

            // Logic: Normalize everything to KRW first for calculation if the stock is in USD
            if (stock.currency === 'USD') {
                stockPrice *= exchangeRate;
                stockAvg *= exchangeRate;
            }

            totalValue += stockPrice * stock.quantity;
            totalInvested += stockAvg * stock.quantity;
        });

        // Logic: If the user wants to see values in USD (only for Overseas tab), convert back to USD
        if (currencyMode === 'USD') {
            totalValue /= exchangeRate;
            totalInvested /= exchangeRate;
        }

        const totalProfitLoss = totalValue - totalInvested;
        const totalReturnRate = totalInvested > 0 ? (totalProfitLoss / totalInvested) * 100 : 0;

        return {
            // Use floor to avoid floating point errors in display, but keep decimals for USD
            totalValue: Math.floor(totalValue * 100) / 100,
            totalProfitLoss: Math.floor(totalProfitLoss * 100) / 100,
            totalReturnRate
        };
    }, [currentStocks, exchangeRate, currencyMode]);

    // Handler to toggle between KRW and USD display modes
    const handleCurrencyToggle = () => {
        setCurrencyMode(prev => prev === 'KRW' ? 'USD' : 'KRW');
    };

    return (
        <>
            {/* Header: Shows title and exchange rate input (if Overseas tab) */}
            <Header
                title='내 투자 현황'
                showExchangeRate={activeTab === 'overseas'}
                exchangeRate={exchangeRate}
                onExchangeRateChange={setExchangeRate}
            />

            {/* Tab Menu: Switch between Domestic and Overseas */}
            <TabMenu activeTab={activeTab} onTabChange={setActiveTab} />

            <div className="flex flex-col gap-2">
                {/* Summary Card: Shows total assets and profit/loss */}
                <SummaryCard
                    totalValue={summary.totalValue}
                    totalProfitLoss={summary.totalProfitLoss}
                    totalReturnRate={summary.totalReturnRate}
                    currency={currencyMode}
                    showCurrencyToggle={activeTab === 'overseas'}
                    onCurrencyToggle={handleCurrencyToggle}
                />

                {/* Asset Chart: Visualizes asset history */}
                <AssetChart
                    data={assetHistoryData}
                    isPositive={summary.totalReturnRate >= 0}
                />

                <div className="h-2 bg-gray-100" /> {/* Visual Spacer */}

                {/* Stock List: Lists individual stock items */}
                <StockList
                    stocks={currentStocks}
                    exchangeRate={exchangeRate}
                    currencyMode={currencyMode}
                />
            </div>

            {/* Floating Action Button: For adding new transactions (Mockup) */}
            <FAB />
        </>
    );
};

export default StockDashboard;
