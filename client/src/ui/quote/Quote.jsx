
import { useEffect } from 'react';
import { useState } from 'react';

import './Quote.css';

function Quote() {

    const [quote, setQuote] = useState('Great Things Take Time');

    useEffect(()=> {
        setQuote('Great Things Take Time')
    }, []);

    return (
        <section className="quote-section">
            <h1>Quote of the Day</h1>
            <p>{quote}</p>
        </section>
    );
};

export default Quote;