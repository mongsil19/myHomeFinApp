import React from 'react';
import { Settings } from 'lucide-react';

interface HeaderProps {
    title: string;
    showExchangeRate?: boolean;
    exchangeRate: number;
    onExchangeRateChange: (rate: number) => void;
}

const Header: React.FC<HeaderProps> = ({
    title,
    showExchangeRate = false,
    exchangeRate,
    onExchangeRateChange
}) => {
    const [isEditing, setIsEditing] = React.useState(false);
    const [tempRate, setTempRate] = React.useState(exchangeRate.toString());

    const handleBlur = () => {
        setIsEditing(false);
        const newRate = parseFloat(tempRate);
        if (!isNaN(newRate) && newRate > 0) {
            onExchangeRateChange(newRate);
        } else {
            setTempRate(exchangeRate.toString());
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleBlur();
        }
    };

    return (
        <header className="flex items-center justify-between px-5 py-4 bg-white sticky top-0 z-10">
            <h1 className="text-2xl font-bold text-gray-900">{title}</h1>

            {showExchangeRate && (
                <div className="flex items-center gap-2 bg-gray-100 px-3 py-1.5 rounded-full">
                    <Settings size={14} className="text-gray-500" />
                    <div className="flex items-center gap-1">
                        <span className="text-xs text-gray-500 font-medium">USD 1 =</span>
                        {isEditing ? (
                            <input
                                type="number"
                                value={tempRate}
                                onChange={(e) => setTempRate(e.target.value)}
                                onBlur={handleBlur}
                                onKeyDown={handleKeyDown}
                                className="w-12 text-sm font-bold text-gray-800 bg-transparent outline-none text-right p-0"
                                autoFocus
                            />
                        ) : (
                            <span
                                className="text-sm font-bold text-gray-800 cursor-pointer hover:text-blue-600 transition-colors"
                                onClick={() => {
                                    setTempRate(exchangeRate.toString());
                                    setIsEditing(true);
                                }}
                            >
                                {exchangeRate.toLocaleString()}원
                            </span>
                        )}
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;
