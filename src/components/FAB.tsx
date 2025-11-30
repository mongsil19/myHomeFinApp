import React from 'react';
import { Plus } from 'lucide-react';

const FAB: React.FC = () => {
    const handleClick = () => {
        alert('내역 추가 기능은 준비 중입니다.');
    };

    return (
        <button
            onClick={handleClick}
            className="fixed bottom-6 right-6 w-14 h-14 bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-105 active:scale-95 z-50"
            aria-label="내역 추가"
        >
            <Plus size={28} strokeWidth={2.5} />
        </button>
    );
};

export default FAB;
