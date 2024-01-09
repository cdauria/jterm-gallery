'use client'

import React, { useState, useEffect } from 'react';

const HomePage = () => {
  const [data, setData] = useState(null);
  const [showCopyButton, setShowCopyButton] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/airtable/');
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
  }, []);

  const copyToClipboardAsMarkdown = () => {
    // Convert data to Markdown string
    const markdown = data.map(item => {
      return `# ${item.projectTitle}
  
  ${item.media ? `![${item.projectTitle}](${item.media})` : ''}
  
  ## ${item.name}
  
  ${item.description}
  `;
    }).join('\n\n');
  
    // Copy to clipboard
    navigator.clipboard.writeText(markdown).then(function() {
      /* clipboard successfully set */
      alert('Markdown copied to clipboard!');
    }, function() {
      /* clipboard write failed */
      alert('Failed to copy markdown to clipboard');
    });
  
    // Hide button
    setShowCopyButton(false);
  };

  return (
    <div className="bg-white min-h-screen text-black">
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-sans mb-5">MDF Projects 2023-2024</h1>
        {data ? (
          <div className="grid grid-cols-3 gap-4 auto-rows-auto">
            {data.map((item) => (
              <div 
                key={item.id} 
                className="bg-white text-black rounded-lg p-3 mb-4"
                style={{ borderTop: `6px solid ${getRandomPastelColor()}`, borderRight: `6px solid ${getRandomPastelColor()}`, borderLeft: `6px solid ${getRandomPastelColor()}`, borderBottom: `6px solid ${getRandomPastelColor()}` }}
              >
                <h2 className="text-2xl font-sans mb-2">{item.projectTitle}</h2>
                {item.media && (
                  <img src={item.media} alt={item.projectTitle} className="w-full h-auto mb-2" /> // Displaying media
                )}
                <h1 className="normal text-l font-sans mb-2">{item.name}</h1>
                <p className="text-sm font-sans">{item.description}</p>
              </div>
            ))}
          </div>
        ) : (
          <p>Loading...</p>
        )}
        <button 
          onClick={() => setShowCopyButton(!showCopyButton)}
          style={{ 
            borderTop: `6px solid ${getRandomPastelColor()}`, 
            borderRight: `6px solid ${getRandomPastelColor()}`, 
            borderLeft: `6px solid ${getRandomPastelColor()}`, 
            borderBottom: `6px solid ${getRandomPastelColor()}`,
            fontWeight: 'bold'
          }}
        >
          Click to copy Markdown
        </button>
        {showCopyButton && (
          <button 
            onClick={copyToClipboardAsMarkdown}
            style={{ 
              borderTop: `6px solid ${getRandomPastelColor()}`, 
              borderRight: `6px solid ${getRandomPastelColor()}`, 
              borderLeft: `6px solid ${getRandomPastelColor()}`, 
              borderBottom: `6px solid ${getRandomPastelColor()}`,
              fontWeight: 'bold'
            }}
          >
            Copy as Markdown
          </button>
        )}
      </div>
    </div>
  );
};

export default HomePage;

function getRandomPastelColor() {
  const h = Math.floor(Math.random() * 360);
  const s = 80; // Lower saturation for pastel
  const l = 85; // Higher lightness for pastel
  return `hsl(${h},${s}%,${l}%)`;
}