import React from 'react';

import RCard from '../../ui/rcard/RCard';

import './Resource.css';

const resources = [
    {
        title: 'Microsoft Azure for Students',
        description: 'Get free access to Azure services, including AI, machine learning, and cloud computing.',
        link: 'https://azure.microsoft.com/en-us/free/students/',
        bcLink: 'https://azurecomcdn.azureedge.net/cvt-8391f8fb534af7f63473462b0b33d8ffb1a1fd73b927d014b0075b43e4e6d011/images/page/services/azure/azure.png',
        logo: 'https://azure.microsoft.com/favicon.ico'
    },
    {
        title: 'Google Cloud for Students',
        description: 'Explore cloud computing with $300 in free credits for students.',
        link: 'https://edu.google.com/programs/cloud/',
        bcLink: 'https://edu.google.com/images/gcp-student.png',
        logo: 'https://edu.google.com/favicon.ico'
    },
    {
        title: 'Autodesk for Students',
        description: 'Get free access to Autodesk software like AutoCAD, Revit, and Maya.',
        link: 'https://www.autodesk.com/education/free-software/overview',
        bcLink: 'https://www.autodesk.com/cms/assets/education/hero-desktop.webp',
        logo: 'https://www.autodesk.com/favicon.ico'
    },
    {
        title: 'JetBrains Student Pack',
        description: 'Free access to JetBrains IDEs, including IntelliJ IDEA, PyCharm, and more.',
        link: 'https://www.jetbrains.com/community/education/#students',
        bcLink: 'https://www.jetbrains.com/branding/static/branding/jetbrains/logo.png',
        logo: 'https://www.jetbrains.com/favicon.ico'
    },
    {
        title: 'Unity Student Plan',
        description: 'Access Unity Pro for game development and real-time 3D projects.',
        link: 'https://unity.com/products/unity-student',
        bcLink: 'https://unity.com/sites/default/files/2020-12/Unity-Learn-Premium-Header-BG.jpg',
        logo: 'https://unity.com/favicon.ico'
    },
    {
        title: 'AWS Educate for Students',
        description: 'Free cloud learning resources and AWS credits.',
        link: 'https://aws.amazon.com/education/awseducate/',
        bcLink: 'https://d1.awsstatic.com/education/Images/education-awseducate.721ea2293c7e4554b30b3b8fbc4c1d16.png',
        logo: 'https://aws.amazon.com/favicon.ico'
    },
    {
        title: 'Matlab for Students',
        description: 'Access Matlab and Simulink for free through student licenses.',
        link: 'https://www.mathworks.com/academia/student_version.html',
        bcLink: 'https://www.mathworks.com/content/dam/mathworks/brand/logo/mathworks-brand.svg',
        logo: 'https://www.mathworks.com/favicon.ico'
    },
    {
        title: 'LinkedIn Learning',
        description: 'Free LinkedIn Learning subscription for skills like coding, business, and software.',
        link: 'https://linkedin.com/learning/',
        bcLink: 'https://media-exp1.licdn.com/dms/image/C4D0BAQERaSCFJXMA4g/company-logo_200_200/0/1605820609141?e=2147483647&v=beta&t=_h15Ru5cTL6HRkmO9ogDFv1DO5bvOcTNp1N1RC3B9J8',
        logo: 'https://linkedin.com/favicon.ico'
    },
    {
        title: 'IBM Academic Initiative',
        description: 'Free access to IBM tools like Watson and data science resources.',
        link: 'https://www.ibm.com/academic',
        bcLink: 'https://www.ibm.com/images/logo/social-share-facebook.png',
        logo: 'https://www.ibm.com/favicon.ico'
    },
    {
        title: 'HackerRank for Students',
        description: 'Free coding challenges and skill-building exercises.',
        link: 'https://www.hackerrank.com/',
        bcLink: 'https://hrcdn.net/hackerrank/assets/hackerrank_120x120-5ebd44254b5d956b0a32f78422f90068.png',
        logo: 'https://hrcdn.net/favicon.ico'
    },
    {
        title: 'Coursera for Students',
        description: 'Access free courses from top universities and companies.',
        link: 'https://www.coursera.org/',
        bcLink: 'https://about.coursera.org/images/coursera-logo.svg',
        logo: 'https://about.coursera.org/favicon.ico'
    },
    {
        title: 'Overleaf Pro for Students',
        description: 'Free access to LaTeX for academic paper writing and projects.',
        link: 'https://www.overleaf.com/edu',
        bcLink: 'https://www.overleaf.com/assets/logos/overleaf_og.png',
        logo: 'https://www.overleaf.com/favicon.ico'
    },
    {
        title: 'Zotero',
        description: 'Free reference management software for academic writing.',
        link: 'https://www.zotero.org/',
        bcLink: 'https://www.zotero.org/static/images/home/logo.png',
        logo: 'https://www.zotero.org/favicon.ico'
    },
    {
        title: 'NVIDIA Developer Program',
        description: 'Free tools and resources for AI, ML, and graphics programming.',
        link: 'https://developer.nvidia.com/student',
        bcLink: 'https://developer.nvidia.com/sites/default/files/akamai/nvidia-web-v2-logotype.svg',
        logo: 'https://developer.nvidia.com/favicon.ico'
    },
    {
        title: 'Quizlet',
        description: 'Free Quizlet Plus for 7 Days',
        link: 'https://freeforstudents.org/go/quizlet-plus',
        bcLink: 'https://api.freeforstudents.org/assets/65a179c4-0e4c-42ad-ad13-b8a63dd600bd?format=auto&width=828',
        logo: 'https://api.freeforstudents.org/assets/3e541e0d-e1cd-4041-9564-645f579ac09d?format=auto&width=128'
    },
    {
        title: 'Notion',
        description: 'Free Productivity and Note-Taking App',
        link: 'https://freeforstudents.org/go/notion-edu',
        bcLink: 'https://api.freeforstudents.org/assets/b1e6c1d9-3f98-41a1-b6c7-3954bf36da82?format=auto&width=640',
        logo: 'https://api.freeforstudents.org/assets/ea4773dc-7011-41a4-bdda-fe6b4671c508?format=auto&width=128'
    }
];


const Resource = () => {
    return (
        <div className='resource-page'>
            <h1>Resources</h1>
            
            <div className='resource-content'>
                {resources.map((resource, index) => {
                    return (
                        <RCard index {...resource} />
                    )
                })}
            </div>
        </div>
    );
};

export default Resource;