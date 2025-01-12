import React, { useState, useEffect } from "react";
import DSA from "./dsa/DSA";
import CP from "./cp/CP";

import './CodeBlooded.css';

const CodeBlooded = () => {
    const [showSection, setShowSection] = useState('dsa');
    const [borderStyle, setBorderStyle] = useState({
        transform: 'translateX(0%)',
        width: '50%',
    });

    const dsa = "< Data Structures & Algorithms >";
    const cp = "< Competitive Programming >";

    useEffect(() => {
        if (showSection === 'dsa') {
            setBorderStyle({
                width: '10%',
                transform: 'translateX(0%)',
            });
            setTimeout(() => {
                setBorderStyle({
                    width: '50%',
                    transform: 'translateX(0%)',
                });
            }, 300);
        } else if (showSection === 'cp') {
            setBorderStyle({
                width: '10%',
                transform: 'translateX(100%)',
            });
            setTimeout(() => {
                setBorderStyle({
                    width: '50%',
                    transform: 'translateX(104%)',
                });
            }, 300);
        }
    }, [showSection]);

    return (
        <section className="codeblood">
            <div className="section-header">

                <img className="code-logo" src='/images/codeblood.jpg' alt="codeblood" title="CodeBlooded"/>
                <div className="button-group">
                    <button
                        className={showSection === 'dsa' ? 'is-active' : ''}
                        onClick={() => setShowSection('dsa')}
                    >
                        {dsa}
                    </button>
                    <button
                        className={showSection === 'cp' ? 'is-active' : ''}
                        onClick={() => setShowSection('cp')}
                    >
                        {cp}
                    </button>
                    {/* Sliding border */}
                    <div
                        className="sliding-border"
                        style={borderStyle}
                    ></div>
                </div>
                <div className="data-container">
                    {showSection === 'dsa' ? <DSA/> : <CP/>}
                </div>
            </div>
        </section>
    );
};

export default CodeBlooded;
