import React from 'react';
import { Home, TrendingUp, Building2, Landmark, CreditCard, BookOpen } from 'lucide-react';
import clsx from 'clsx';

interface SidebarProps {
    activeModule: string;
    onModuleChange: (module: string) => void;
}

// Menu items configuration for the Sidebar
const menuItems = [
    { id: 'home', label: '홈', icon: Home },
    { id: 'stocks', label: '주식', icon: TrendingUp },
    { id: 'real-estate', label: '부동산', icon: Building2 },
    { id: 'bank', label: '예금/적금', icon: Landmark },
    { id: 'cards', label: '카드', icon: CreditCard },
    { id: 'ledger', label: '가계부', icon: BookOpen },
];

/**
 * Sidebar Component
 * 
 * The primary navigation for Desktop and Tablet users.
 * - Fixed to the left side of the screen.
 * - Hidden on Mobile (`hidden md:flex`).
 * - Displays the app logo, navigation menu, and user profile area.
 */
const Sidebar: React.FC<SidebarProps> = ({ activeModule, onModuleChange }) => {
    return (
        <aside className="hidden md:flex flex-col w-64 h-screen bg-white border-r border-gray-100 fixed left-0 top-0 z-20">
            {/* App Logo Area */}
            <div className="p-6">
                <h2 className="text-2xl font-bold text-blue-500">MyHomeFin</h2>
            </div>

            {/* Navigation Menu */}
            <nav className="flex-1 px-4 py-2 space-y-1">
                {menuItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeModule === item.id;

                    return (
                        <button
                            key={item.id}
                            onClick={() => onModuleChange(item.id)}
                            className={clsx(
                                "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors",
                                isActive
                                    ? "bg-blue-50 text-blue-600" // Active state style
                                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900" // Inactive state style
                            )}
                        >
                            <Icon size={20} className={isActive ? "text-blue-600" : "text-gray-400"} />
                            {item.label}
                        </button>
                    );
                })}
            </nav>

            {/* User Profile Area (Bottom) */}
            <div className="p-6 border-t border-gray-100">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gray-200" />
                    <div>
                        <p className="text-sm font-semibold text-gray-900">사용자님</p>
                        <p className="text-xs text-gray-500">내 정보 수정</p>
                    </div>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
