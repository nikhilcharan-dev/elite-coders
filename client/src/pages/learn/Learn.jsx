import React, { useState, useEffect } from 'react';
import Axios from '@api';
import CheatsheetPanel from '../cheatsheet/CheatSheetPanel';
import TSection from '../tsection/TSection';

import './Learn.css';
import '../filter/Filter.css';

const Learn = () => {
    const [questions, setQuestions] = useState([]);
    const [allQuestions, setAllQuestions] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchQuestions = async () => {
            setLoading(true);
            try {
                const res = await Axios.get(`${import.meta.env.VITE_BASE_URL}/api/topics/`);
                setQuestions(res.data);
                setAllQuestions(res.data);
            } catch(err) {
                console.log(err.data.message);
            }
            setLoading(false);
        };

        fetchQuestions();
    }, []);


    const handleFilter = (filters) => {
        setLoading(true);
        if(filters.length === 0) {
            setQuestions(allQuestions);
            return;
        }
        const filtered = allQuestions.filter((question) =>
            filters.some((filter) => question.name.toLowerCase().includes(filter))
        );
        console.log(filtered)
        setQuestions(filtered);
        setLoading(false);
    };

    return (
        <div className='learn-section'>
            <CheatsheetPanel />
            <Filter 
                onFilter={handleFilter}
            />
            <TSection 
                questions={questions}
                loading={loading}
            />
        </div>
    );
};

const Filter = ({ onFilter }) => {
    const [filter, setFilter] = useState('');

    const handleTopicChange = (e) => {
		const { value } = e.target;
		setFilter(() => value);
	};

    const handleFilter = (e) => {
        e.preventDefault();
        const topics = filter ? filter.split(',').map(e => e.trim().toLowerCase()) : [];
        onFilter(topics);
    }

    const handleRefresh = () => {
        setFilter('');
        handleFilter();
    }

    return (
        <div className='filter-section'>
            <h3>Filter Questions</h3>
            <form onSubmit={handleFilter}>
                <div className='filter-item'>
                    <label>Topic</label>
                    <input 
                        type='text'
                        name='topics'
                        value={filter}
                        onChange={handleTopicChange}
                        placeholder='Enter Topics (comma separated)'
                    />
                </div>
                <div className='filter-btns'>
                    <button type="submit" className="filter-btn">Apply Filters</button>
                    <button onClick={handleRefresh}className='filter-btn'>Reset</button>
                </div>
            </form>
        </div>
    )
};

export default Learn