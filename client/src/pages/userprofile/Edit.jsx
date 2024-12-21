import React from 'react'

const Edit = ({ onClose, user }) => {
    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h3>Edit Profile</h3>
                {/* Add form fields for editing user information */}
                <p>Username: {user.username}</p>
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    );
};

export default Edit;