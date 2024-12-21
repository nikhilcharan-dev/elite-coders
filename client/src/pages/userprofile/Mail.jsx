import React from 'react'

const Mail = ({ onClose }) => {
    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h3>Your Mails</h3>
                {/* Add mail display logic here */}
                <p>No new mails at the moment.</p>
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    );
};

export default Mail;