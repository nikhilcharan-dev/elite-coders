import { useEffect, useState } from 'react';
import axios from 'axios';
import './Quote.css';

function Quote() {
    const [quote, setQuote] = useState('Great Things Take Time');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchJoke = async () => {
            try {
                let response = null;
                if(Math.random() > 0.5) {
                    response = await axios.get('https://v2.jokeapi.dev/joke/Programming?type=horizontal');
                    setQuote(response.data.joke);
                    console.log('okokok');
                } else {
                    response = await axios.get('https://zenquotes.io/api/random');
                    console.log(response);
                    response = response.data[0];
                    setQuote(response.q);

                }
            } catch (err) {
                console.error(err);
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
                <p>Loading...</p>
            ) : (
                <p>{quote}</p>
            )}
        </section>
    );
};

export default Quote;
