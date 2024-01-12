'use client'

import React, { useState, useEffect } from 'react';
import styles from '../../components/projectCard.module.css'
import { inter, roboto_mono, nunito_sans, montserrat, hind, lora, merriweather, epilogue, alfa_slab_one, gentium_book_plus, dm_sans, dm_serif_display, playfair_display, archivo_black, red_hat_display, tenor_sans, archivo_narrow } from '../fonts'

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
      alert('markdown copied to clipboard!');
    }, function() {
      /* clipboard write failed */
      alert('Failed to copy markdown to clipboard');
    });
  
    // Hide button
    setShowCopyButton(false);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className={`${styles.container}`}>
      <div className={styles.innerContainer}>
      <h1 className={`${epilogue.className} ${styles.title}`}>media & design fellow projects</h1>
        {data ? (
          <div className={styles.grid}>
            {data.map((item) => (
              <div 
                key={item.id} 
                className={styles.card}
              >
                <h2 className={`${epilogue.className} ${styles.projectTitle}`}>{item.projectTitle}</h2>
                {item.media && (
                  <img src={item.media} alt={item.projectTitle} className={styles.image} /> // Displaying media
                )}
                <h1 className={`${epilogue.className} ${styles.name}`}>{item.name}</h1>
                <p className={`${tenor_sans.className} ${styles.description}`}>{item.description}</p>
              </div>
            ))}
          </div>
        ) : (
          <p>Loading...</p>
        )}
        <button 
          onClick={() => setShowCopyButton(!showCopyButton)}
          className={styles.button}
        >
          click to copy markdown
        </button>
        {showCopyButton && (
          <button 
            onClick={copyToClipboardAsMarkdown}
            className={styles.button}
          >
            copy as markdown
          </button>
        )}
      </div>
    </div>
  );
};


export default HomePage;