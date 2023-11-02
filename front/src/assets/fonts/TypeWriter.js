// Typewriter.js

import React, { useState, useEffect } from 'react';

const Typewriter = ({ text = '', delay = 100 }) => { // Default values added
    const [displayedText, setDisplayedText] = useState('');

    useEffect(() => {
        if (!text) return; // Check if text is provided
        
        let index = 0;
        
        const typeInterval = setInterval(() => {
            if (index < text.length) {
                setDisplayedText((prevText) => prevText + text[index]);
                index++;
            } else {
                clearInterval(typeInterval);
            }
        }, delay);

        return () => clearInterval(typeInterval); // Cleanup on unmount
    }, [text, delay]);

    return <span>{displayedText}</span>;
};

export default Typewriter;
