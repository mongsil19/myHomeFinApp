import React from 'react';

const TailwindTest: React.FC = () => {
    return (
        <div className="min-h-screen bg-gray-100 p-8 flex flex-col items-center justify-center">
            <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-6">
                <h1 className="text-2xl font-bold text-gray-800 mb-4 text-center">
                    Tailwind CSS Test
                </h1>
                <p className="text-gray-600 mb-6 text-center">
                    If you can see this styled card, Tailwind CSS is working correctly!
                </p>

                <div className="space-y-4">
                    <div className="p-4 bg-blue-100 text-blue-700 rounded-md border border-blue-200">
                        <span className="font-semibold">Blue Alert:</span> This is a blue alert box.
                    </div>

                    <div className="p-4 bg-green-100 text-green-700 rounded-md border border-green-200">
                        <span className="font-semibold">Green Alert:</span> This is a green alert box.
                    </div>

                    <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded transition duration-300">
                        Hover Me
                    </button>
                </div>

                <div className="mt-8 grid grid-cols-3 gap-2">
                    <div className="h-12 bg-red-400 rounded"></div>
                    <div className="h-12 bg-yellow-400 rounded"></div>
                    <div className="h-12 bg-teal-400 rounded"></div>
                </div>
            </div>
        </div>
    );
};

export default TailwindTest;
