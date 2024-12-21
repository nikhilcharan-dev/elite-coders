import React, { useState } from 'react';
import './Popup.css';

const Popup = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;

    return (
        <div className="popup-overlay">
            <div className="popup">
                <div className="popup-header">
                    <h2>{title}</h2>
                    <button className="close-btn" onClick={onClose}>X</button>
                </div>
                <div className="popup-body">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Popup;
