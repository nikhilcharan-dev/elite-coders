import React, { useEffect, useState }  from 'react';
import { useParams } from 'react-router-dom';
import Question from "../Question.jsx";
import Axios from "@api";

import './TopicDetail.css';

const TopicDetail = () => {
    const [topics, setTopics] = useState(null);
    const [loading, setLoading] = useState(true);
    const Topic = useParams().topic;
    
    useEffect(() => {
        console.log(Topic)

        const getTopic = async () => {
            setLoading(true);
            try {
                const res = await Axios.get(`/api/codeblood/find/${Topic}`);
                const topic = res.data;
                const qres = await Axios.post("/api/questions/filter/byIds", { ids: topic.questions });
                topic.questions = qres.data;
                setTopics(topic);
                console.log(topic.questions);
            } catch (err) {
                console.log(err);
            }
            setLoading(false);
        }
        getTopic();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className='codeblood'>
            <div className="section-header">
                <h1 className='topic-head'>{topics.topic}</h1>
                <img className="code-logo" src='/images/codeblood.jpg' alt="codeblood" title="CodeBlooded"/>
                <div className='topic-data-container questions-container'>
                {
                    topics.questions.map((question, idx) => (
                        <Question key={idx} question={question} style={"grid"} />
                    ))
                }
                </div>
            </div>
        </div>
    )
}

export default TopicDetail