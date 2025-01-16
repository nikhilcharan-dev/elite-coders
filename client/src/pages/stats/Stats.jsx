import React, { useEffect } from 'react';

import './Stats.css';

const Stats = () => {
    const [lc, setLc] = useState(null);
    const [cc, setCc] = useState(null);
    const [cf, setCf] = useState(null);

    useEffect(() => {
        (async () => {
            try {
                const res = await fetch('/api/stats');
                const data = await res.json();
                setLc(data.leetcode);
                setCc(data.codechef);
                setCf(data.codeforces);
            } catch (err) {
                console.error(err);
            }
        })();
    }, []);

    return (
        <section>
            <UserStats  />
        </section>
    );
};

export default Stats;