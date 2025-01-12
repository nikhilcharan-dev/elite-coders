import React, { useState } from 'react';
import './Question.css';

const QuestionCard = ({ question }) => {
    return (
        <div className="codeblood-card">
            <div className="codeblood-name">{question.name}</div>
            <div className="codeblood-details">
                <span className={`difficulty ${question.difficulty.toLowerCase()}`}>
                    {question.difficulty}
                </span>
                <span className="platform">{question.platform}</span>
            </div>
            <button className="solveBtn">Solve</button>
        </div>
    );
};

export default QuestionCard;
