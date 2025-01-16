import React, { useEffect, useState } from 'react';
import './Question.css';

const QuestionCard = ({ question, style }) => {
    return (
        <div className={`codeblood-card`}>
            <div className="codeblood-name">{question.name}</div>
            <div className="codeblood-details">
                <span className={`difficulty ${question.difficulty.toLowerCase()}`}>
                    {question.difficulty}
                </span>
                <span className="platform">{question.platform}</span>
            </div>
            <button className="solveBtn" onClick={() => window.open(question.link, "__blank")} >Solve</button>
        </div>
    );
};

export default QuestionCard;
