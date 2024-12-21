import React, { useState } from 'react';
import './QSection.css';

const Questions = ({ questions, onRandomQuestion, onRecommendQuestion }) => {
  return (
    <div className="questions-section">
      <h3>Questions</h3>

      {/* Random Question Button */}
      <button className="random-btn" onClick={onRandomQuestion}>Get Random Question</button>

      {/* List of Questions */}
      <div className="questions-list">
        {questions?.length > 0 ? (
          questions.map((question, index) => (
            <div key={index} className="question-card">
              <h4>{question.name}</h4>
              <p><strong>Topics:</strong> {question.topics.join(', ')}</p>
              <p><strong>Difficulty:</strong> {question.difficulty}</p>
              <p><strong>Platform:</strong> {question.platform}</p>
              <button className='link-btn'><a href={question.link}>Link</a></button>
              <button className="recommend-btn" onClick={() => onRecommendQuestion(question)}>Recommend</button>
            </div>
          ))
        ) : (
          <p>No questions found</p>
        )}
      </div>
    </div>
  );
};

export default Questions;
