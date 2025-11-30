import React from 'react';
import clsx from 'clsx';

interface TabMenuProps {
    activeTab: 'domestic' | 'overseas';
    onTabChange: (tab: 'domestic' | 'overseas') => void;
}

const TabMenu: React.FC<TabMenuProps> = ({ activeTab, onTabChange }) => {
    return (
        <div className="px-5 pb-2 bg-white">
            <div className="flex gap-6 border-b border-gray-100">
                <button
                    className={clsx(
                        "pb-3 text-base font-semibold transition-colors relative",
                        activeTab === 'domestic'
                            ? "text-gray-900"
                            : "text-gray-400 hover:text-gray-600"
                    )}
                    onClick={() => onTabChange('domestic')}
                >
                    국내 주식
                    {activeTab === 'domestic' && (
                        <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gray-900 rounded-t-full" />
                    )}
                </button>
                <button
                    className={clsx(
                        "pb-3 text-base font-semibold transition-colors relative",
                        activeTab === 'overseas'
                            ? "text-gray-900"
                            : "text-gray-400 hover:text-gray-600"
                    )}
                    onClick={() => onTabChange('overseas')}
                >
                    해외 주식
                    {activeTab === 'overseas' && (
                        <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gray-900 rounded-t-full" />
                    )}
                </button>
            </div>
        </div>
    );
};

export default TabMenu;
