import React from 'react';
import clsx from 'clsx';

interface LayoutProps {
    children: React.ReactNode;
    className?: string;
}

const Layout: React.FC<LayoutProps> = ({ children, className }) => {
    return (
        <div className="min-h-screen bg-[#F2F4F6] md:pl-64">
            <div className={clsx(
                "w-full min-h-screen mx-auto",
                "md:max-w-4xl md:p-8", // Desktop constraints: Max width and padding
                "bg-white md:bg-transparent", // Mobile: White bg, Desktop: Transparent (shows gray body bg)
                className
            )}>
                {children}
            </div>
        </div>
    );
};

export default Layout;
