import React from 'react';
import { AreaChart, Area, Tooltip, ResponsiveContainer } from 'recharts';
import type { AssetHistory } from '../types';
import clsx from 'clsx';

interface AssetChartProps {
    data: AssetHistory[];
    isPositive: boolean;
}

/**
 * AssetChart Component
 * 
 * Visualizes the asset value trend over time using an Area Chart.
 * - Uses `recharts` library.
 * - Dynamic coloring: Red for positive trend, Blue for negative trend.
 * - Includes a gradient fill for a polished look.
 */
const AssetChart: React.FC<AssetChartProps> = ({ data, isPositive }) => {
    const [activePeriod, setActivePeriod] = React.useState<'1W' | '1M' | '1Y'>('1M');

    // Determine chart color based on trend (Red vs Blue)
    const color = isPositive ? '#EF4444' : '#3B82F6';

    return (
        <div className="bg-white pb-6">
            <div className="h-[200px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                        data={data}
                        margin={{ top: 10, right: 0, left: 0, bottom: 0 }}
                    >
                        {/* Gradient Definition */}
                        <defs>
                            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor={color} stopOpacity={0.1} />
                                <stop offset="95%" stopColor={color} stopOpacity={0} />
                            </linearGradient>
                        </defs>

                        <Tooltip
                            contentStyle={{
                                backgroundColor: '#333',
                                border: 'none',
                                borderRadius: '8px',
                                color: '#fff',
                                fontSize: '12px'
                            }}
                            itemStyle={{ color: '#fff' }}
                            formatter={(value: number) => [`${value.toLocaleString()}원`, '평가금액']}
                            labelStyle={{ display: 'none' }}
                        />

                        <Area
                            type="monotone"
                            dataKey="value"
                            stroke={color}
                            strokeWidth={2}
                            fillOpacity={1}
                            fill="url(#colorValue)"
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>

            {/* Period Filter Buttons (Mock functionality for now) */}
            <div className="flex justify-center gap-2 mt-4 px-5">
                {(['1W', '1M', '1Y'] as const).map((period) => (
                    <button
                        key={period}
                        onClick={() => setActivePeriod(period)}
                        className={clsx(
                            "px-4 py-1.5 rounded-full text-xs font-semibold transition-colors",
                            activePeriod === period
                                ? "bg-gray-100 text-gray-900"
                                : "text-gray-400 hover:text-gray-600"
                        )}
                    >
                        {period === '1W' ? '1주' : period === '1M' ? '1달' : '1년'}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default AssetChart;
