import React, { useState } from 'react';
import './Question.css';

const QuestionCard = ({ question }) => {
    const [isSolved, setIsSolved] = useState(false);

    const handleCheckboxChange = () => {
        setIsSolved(!isSolved);
    };

    return (
        <div className="question-card">
            <div className="question-name">{question.name}</div>
            <div className="question-details">
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
