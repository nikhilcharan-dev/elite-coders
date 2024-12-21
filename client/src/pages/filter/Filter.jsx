import React, { useState } from 'react';
import './Filter.css';

const Filter = ({ onFilter }) => {
  const [filters, setFilters] = useState({
    topics: [],
    difficulty: '',
    platform: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const handleTopicChange = (e) => {
    const { value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      topics: value ? value.split(',') : [],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onFilter(filters);
  };

  return (
    <div className="filter-section">
      <h3>Filter Questions</h3>
      <form onSubmit={handleSubmit}>
        <div className="filter-item">
          <label>Topics</label>
          <input
            type="text"
            name="topics"
            value={filters.topics}
            onChange={handleTopicChange}
            placeholder="Enter topics (comma separated)"
          />
        </div>
        <div className="filter-item">
          <label>Difficulty</label>
          <select
            name="difficulty"
            value={filters.difficulty}
            onChange={handleInputChange}
          >
            <option value="">Select Difficulty</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>
        <div className="filter-item">
          <label>Platform</label>
          <select
            name="platform"
            value={filters.platform}
            onChange={handleInputChange}
          >
            <option value="">Select Platform</option>
            <option value="LeetCode">LeetCode</option>
            <option value="HackerRank">HackerRank</option>
            <option value="Codeforces">Codeforces</option>
            <option value="Codewars">Codewars</option>
          </select>
        </div>
        <button type="submit" className="filter-btn">Apply Filters</button>
      </form>
    </div>
  );
};

export default Filter;
