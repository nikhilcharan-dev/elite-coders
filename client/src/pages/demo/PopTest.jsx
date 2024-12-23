import React, { useState } from 'react';
import Popup from '../popup/Popup';

import Button from '../../ui/button/Button';

const PopTest = () => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const togglePopup = () => {
        setIsPopupOpen(!isPopupOpen);
    };

    return (
        <div className="app">
            <button onClick={togglePopup}>Open Popup</button>
            <Button />

            <Popup isOpen={isPopupOpen} onClose={togglePopup} title="Welcome to the Popup!">
                <p>This is a sample popup message.</p>
                <button onClick={togglePopup}>Close</button>
            </Popup>
        </div>
    );
};

export default PopTest;
