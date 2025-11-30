import React from 'react';
import type { Stock } from '../types';
import StockItem from './StockItem';

interface StockListProps {
    stocks: Stock[];
    exchangeRate: number;
    currencyMode: 'KRW' | 'USD';
}

const StockList: React.FC<StockListProps> = ({ stocks, exchangeRate, currencyMode }) => {
    return (
        <div className="px-5 pb-24">
            <h3 className="text-lg font-bold text-gray-900 mb-2">보유 주식</h3>
            <div className="flex flex-col">
                {stocks.map((stock) => (
                    <StockItem
                        key={stock.id}
                        stock={stock}
                        exchangeRate={exchangeRate}
                        currencyMode={currencyMode}
                    />
                ))}
            </div>
        </div>
    );
};

export default StockList;
