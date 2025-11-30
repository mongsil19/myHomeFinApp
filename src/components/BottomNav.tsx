import React from 'react';
import { Home, TrendingUp, Building2, Menu } from 'lucide-react';
import clsx from 'clsx';

interface BottomNavProps {
    activeModule: string;
    onModuleChange: (module: string) => void;
}

// Main items for the Bottom Navigation (limited to 4-5 items for space)
const mainItems = [
    { id: 'home', label: '홈', icon: Home },
    { id: 'stocks', label: '주식', icon: TrendingUp },
    { id: 'real-estate', label: '부동산', icon: Building2 },
    { id: 'menu', label: '전체', icon: Menu }, // Placeholder for expanding other items
];

/**
 * BottomNav Component
 * 
 * The primary navigation for Mobile users.
 * - Fixed to the bottom of the screen.
 * - Hidden on Desktop (`md:hidden`).
 * - Displays a simplified set of menu items.
 */
const BottomNav: React.FC<BottomNavProps> = ({ activeModule, onModuleChange }) => {
    return (
        <nav className="md:hidden fixed bottom-0 left-0 w-full bg-white border-t border-gray-100 pb-safe z-20">
            <div className="flex justify-around items-center h-16">
                {mainItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeModule === item.id;

                    return (
                        <button
                            key={item.id}
                            onClick={() => onModuleChange(item.id)}
                            className="flex flex-col items-center justify-center w-full h-full gap-1"
                        >
                            <Icon
                                size={24}
                                className={clsx(
                                    "transition-colors",
                                    isActive ? "text-gray-900" : "text-gray-300"
                                )}
                            />
                            <span className={clsx(
                                "text-[10px] font-medium transition-colors",
                                isActive ? "text-gray-900" : "text-gray-400"
                            )}>
                                {item.label}
                            </span>
                        </button>
                    );
                })}
            </div>
        </nav>
    );
};

export default BottomNav;
