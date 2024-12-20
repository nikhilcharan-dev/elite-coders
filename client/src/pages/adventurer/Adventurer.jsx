import React from 'react';

import scenary from '../assests/image.png'

import './Adventurer.css';

const Adventurer = () => {
    return (
        <div className='tale'>
            <h1>Adventurer: Lost in an Adventure '404'</h1>
            <img src={scenary} alt='adventure'/>
            <p>Hoho!! It seems the great Adventurer has wandered off the beaten path. 
                Beware, Brave Adventurer, for the road ahead is fraught with peril and uncertainty.
                <br/> Yet, even in the face of adversity, never lose hope and press onward!
            </p>
            <a href='/'>Return to the safety of the village</a>
            <p>Remember, every great story has its twists and turns. <br/> Embrace the journey!</p>
        </div>
    );
};

export default Adventurer;