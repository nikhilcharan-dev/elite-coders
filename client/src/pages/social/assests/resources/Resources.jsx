import React from 'react';
import { useNavigate } from 'react-router-dom';

import './Resources.css';

const resources = [
    {
        title: 'Amazon Web Services',
        description: 'Learn Cloud Skills with AWS Educate',
        link: 'https://freeforstudents.org/go/aws-educate',
        bcLink: 'https://api.freeforstudents.org/assets/113ef381-be3a-4cb0-8ca3-65a6145f423d?format=auto&width=828',
        logo: 'https://api.freeforstudents.org/assets/b2541cf7-f8f1-44d0-96a4-372aadc05573?format=auto&width=128'
    },
    {
        title: 'GitHub',
        description: 'Student Developer Pack',
        link: 'https://freeforstudents.org/go/student-developer-pack',
        bcLink: 'https://api.freeforstudents.org/assets/c2034dd9-311e-40db-881e-c436c471b3f9?format=auto&width=640',
        logo: 'https://api.freeforstudents.org/assets/c611bd9f-46f4-443d-9635-f0f42b0fecf8?format=auto&width=128'
    },
    {
        title: 'Intel',
        description: 'Free Software Development Tools',
        link: 'https://freeforstudents.org/go/intel-software-tools',
        bcLink: 'https://api.freeforstudents.org/assets/5d8441c0-3201-460f-bbf1-056f56b5db77?format=auto&width=640',
        logo: 'https://api.freeforstudents.org/assets/6a77a1e6-7d97-42ef-b3ac-57a7621cb8df?format=auto&width=128'
    },
    {
        title: 'Kickresume',
        description: 'Free Resume Builder for Students',
        link: 'https://freeforstudents.org/go/free-resume-builder',
        bcLink: 'https://api.freeforstudents.org/assets/1d4f498b-3668-4810-bdc9-6f6ffede42f1?format=auto&width=640',
        logo: 'https://api.freeforstudents.org/assets/b10b19d3-ed5a-430b-8ba0-1b3fab1f2422?format=auto&width=128'
    }
];

const Resources = () => {

    const navigate = useNavigate();

    const handleClick = (link) => {
        window(link, "_blank");
    }

    return (
        <div className='resource-container'>
            <h1>Resources</h1>
            <div className='resource-content'>
                {resources.map((resources, index) => {
                    return (
                        <div key={index} className='resource-card' onCanPlayThrough={() => handleClick(link)}>
                            <img src={resources.bcLink} alt={resources.title} className='background-logo'/>
                            <img src={resources.logo} alt={resources.title} className='resource-logo'/>
                            <h3>{resources.title.toUpperCase()}</h3>
                            <p>{resources.description}</p>
                        </div>
                )})}
            </div>
            <button className='expander' onClick={() => navigate('meta/social/resources')}>
                More
            </button>
        </div>
    );
};

export default Resources;

// {
//     title: 'Quizlet',
//     description: 'Free Quizlet Plus for 7 Days',
//     link: 'https://freeforstudents.org/go/quizlet-plus'
// },
// {
//     title: 'Notion',
//     description: 'Free Productivity and Note-Taking App',
//     link: 'https://freeforstudents.org/go/notion-edu'
// }