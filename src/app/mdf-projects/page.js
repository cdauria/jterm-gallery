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

    // Render the fetched data
    return (
        <div>
            <h1>mdf projects 2023-2024</h1>
            {data ? (
                <ul>
                    {data.map((item) => (
                        <li key={item.id}>
                            <h2>{item.projectTitle}</h2>
                            <p>{item.description}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default HomePage;