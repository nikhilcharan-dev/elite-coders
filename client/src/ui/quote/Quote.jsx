import { useEffect, useState } from 'react';
import axios from 'axios';
import './Quote.css';

function Quote() {
    const [quote, setQuote] = useState('Great Things Take Time');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchJoke = async () => {
            const BASE_URL = import.meta.env.VITE_BASE_URL;
            try {
                const response = await axios.get(`${BASE_URL}/api/random/quote`);
                setQuote(response.data.quote);
            } catch (err) {
                setQuote('Great Things Take Time');
            } finally {
                setLoading(false);
            }
        };

        fetchJoke();
    }, []);

    return (
        <section className="quote-section">
            <h1>Quote of the Day</h1>
            {loading ? (
                <>
                    <p>Loading...</p>
                </>     
            ) : (
                <p>{quote}</p>
            )}
        </section>
    );
};

export default Quote;
