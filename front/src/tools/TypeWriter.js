import React, { useState, useEffect } from 'react';

const Typewriter = ({ text = '', delay = 100 }) => {
    const [displayedText, setDisplayedText] = useState('');

    useEffect(() => {
        const validText = String(text);

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

        return () => clearInterval(typeInterval);
    }, [text, delay]);

    return <span>{displayedText}</span>;
};

export default Typewriter;
