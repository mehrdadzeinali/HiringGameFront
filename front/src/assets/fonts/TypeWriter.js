// Typewriter.js

import React, { useState, useEffect } from 'react';

const Typewriter = ({ text = '', delay = 100 }) => {
    const [displayedText, setDisplayedText] = useState('');

    useEffect(() => {
        // Convert text to string to prevent "undefined" or "null" text issues
        const validText = String(text);

        // Early return if text is empty
        if (!validText) return;

        let index = 0;

        const typeInterval = setInterval(() => {
            if (index < validText.length) {
                setDisplayedText((prevText) => prevText + validText.charAt(index));
                index++;
            } else {
                clearInterval(typeInterval);
            }
        }, delay);

        // Cleanup interval on unmount or when text/delay changes
        return () => clearInterval(typeInterval);
    }, [text, delay]); // Depend on text and delay, rerun effect if these props change

    return <span>{displayedText}</span>;
};

export default Typewriter;
