import { createContext, useState, useEffect } from 'react';

export const DayContext = createContext();

export const DayProvider = ({ children }) => {

    const [day, setDay] = useState(new Date().toLocaleDateString('en-us', {weekday: 'long'}));

    useEffect(() => {
        const getMillisecondsUntilMidnight = () => {
            const now = new Date();
            const midnight = new Date();
            midnight.setHours(24, 0, 0, 0);
            return midnight - now;
        };

        const updateDayAtMidnight = () => {
            const newDay = new Date().toLocaleDateString('en-us', { weekday: 'long' });
            setDay(newDay);

            setTimeout(updateDayAtMidnight, getMillisecondsUntilMidnight());
        };

        const timeout = setTimeout(updateDayAtMidnight, getMillisecondsUntilMidnight());

        return () => clearTimeout(timeout);
    }, []);

    return (
        <DayContext.Provider value={{ day, setDay }}>
            {children}
        </DayContext.Provider>
    );
};
