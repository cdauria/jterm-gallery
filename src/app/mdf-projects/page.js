'use client'

import React, {useState, useEffect} from 'react';


const HomePage = () => {
    // State to store the fetched data
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/api/airtable/'); // Replace with your actual API route
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const result = await response.json();
                setData(result.result); // Assuming your API returns an object with a 'result' property
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []); // Empty dependency array ensures this runs once on mount

    return (
        <div className="bg-white dark:bg-gray-900 text-black dark:text-white min-h-screen">
            <div className="container mx-auto p-4">
                <h1 className="text-3xl font-bold mb-5">mdf projects 2023-2024</h1>
                {data ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {data.map((item) => (
                            <div key={item.id} className="border border-gray-300 dark:border-gray-700 rounded-lg p-4 h-64 overflow-auto"> {/* Fixed height and overflow for scroll */}
                                <h2 className="text-xl font-semibold mb-2">{item.projectTitle}</h2>
                                <p className="text-sm">{item.description}</p> {/* Smaller font size for description */}
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>Loading...</p>
                )}
            </div>
        </div>
    );
};

export default HomePage;