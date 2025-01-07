import React from 'react';

import RCard from '../../ui/rcard/RCard';
import NavBar from '../../ui/navbar/NavBar';

import './Resource.css';

const resources = [
    {
        title: 'Microsoft Azure for Students',
        description: 'Get free access to Azure services, including AI, machine learning, and cloud computing.',
        link: 'https://azure.microsoft.com/en-us/free/students/',
        bcLink: 'https://th.bing.com/th?id=OIP.EpkgotTXzmhX-_5YVu4ysQHaE8&w=306&h=204&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2',
        logo: 'https://th.bing.com/th/id/OIP.VleZRz5eT_sdNrs7X8BADAHaEK?w=277&h=180&c=7&r=0&o=5&pid=1.7'
    },
    {
        title: 'Google Cloud for Students',
        description: 'Explore cloud computing with $300 in free credits for students.',
        link: 'https://cloud.google.com/edu/students',
        bcLink: 'http://ts3.mm.bing.net/th?id=OIP.VPTDOCbtNRQSOwWmw_zERwHaDi&pid=15.1',
        logo: 'https://th.bing.com/th/id/OIP.RYFGIs_b2WZrOcqCbvpQwQHaEK?w=283&h=180&c=7&r=0&o=5&pid=1.7'
    },
    {
        title: 'Autodesk for Students',
        description: 'Get free access to Autodesk software like AutoCAD, Revit, and Maya.',
        link: 'https://www.autodesk.com/education/free-software/overview',
        bcLink: 'https://th.bing.com/th/id/OIP.eiQgpqwX-WN9OvlBiJlVlAHaEK?w=279&h=180&c=7&r=0&o=5&pid=1.7',
        logo: 'https://th.bing.com/th/id/OIP.R_8ZQeTA4cV6K_33C2nmhgHaHa?w=158&h=180&c=7&r=0&o=5&pid=1.7'
    },
    {
        title: 'JetBrains Student Pack',
        description: 'Free access to JetBrains IDEs, including IntelliJ IDEA, PyCharm, and more.',
        link: 'https://www.jetbrains.com/community/education/#students',
        bcLink: 'https://blog.jetbrains.com/wp-content/uploads/2019/02/jetbrains_social.png',
        logo: 'https://www.jetbrains.com/favicon.ico'
    },
    {
        title: 'Unity Student Plan',
        description: 'Access Unity Pro for game development and real-time 3D projects.',
        link: 'https://unity.com/products/unity-student',
        bcLink: 'https://th.bing.com/th/id/OIP.g-Ny5SXJSbJXmuRrOqSSKQHaEJ?w=276&h=180&c=7&r=0&o=5&pid=1.7',
        logo: 'https://th.bing.com/th/id/OIP._I1efRPRNUfZSrC4riGxzwHaHa?w=512&h=512&rs=1&pid=ImgDetMain'
    },
    {
        title: 'AWS Educate for Students',
        description: 'Free cloud learning resources and AWS credits.',
        link: 'https://aws.amazon.com/education/awseducate/',
        bcLink: 'https://th.bing.com/th/id/OIP.11GcHhpW5zzmyN6H4O6JcAAAAA?w=315&h=167&c=7&r=0&o=5&pid=1.7',
        logo: 'https://images.squarespace-cdn.com/content/v1/52167b79e4b01820fd2800a1/1486356349525-HGI7NH53ULTZIGFTD774/aws-educate-logo.png'
    },
    {
        title: 'Matlab for Students',
        description: 'Access Matlab and Simulink for free through student licenses.',
        link: 'https://www.mathworks.com/academia/student_version.html',
        bcLink: 'https://149695847.v2.pressablecdn.com/wp-content/uploads/2019/01/matlab-tutorials-feature_1290x688_ms-940x501-1.jpg',
        logo: 'https://www.mathworks.com/favicon.ico'
    },
    {
        title: 'LinkedIn Learning',
        description: 'Free LinkedIn Learning subscription for skills like coding, business, and software.',
        link: 'https://linkedin.com/learning/',
        bcLink: 'https://static.licdn.com/aero-v1/sc/h/32ksdkg9c3csh29bnk3h7ieq4',
        logo: 'https://linkedin.com/favicon.ico'
    },
    {
        title: 'IBM Academic Initiative',
        description: 'Free access to IBM tools like Watson and data science resources.',
        link: 'https://www.ibm.com/academic',
        bcLink: 'https://th.bing.com/th/id/OIP.e95c3V4SM2CUuOXz3XiB8AHaEK?w=317&h=180&c=7&r=0&o=5&pid=1.7',
        logo: 'https://th.bing.com/th/id/OIP.jYPElEiywv48WOwLpsWUkgHaE7?w=246&h=180&c=7&r=0&o=5&pid=1.7'
    },
    {
        title: 'HackerRank for Students',
        description: 'Free coding challenges and skill-building exercises.',
        link: 'https://www.hackerrank.com/',
        bcLink: 'data:image/jpeg;base64,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',
        logo: 'https://hrcdn.net/favicon.ico'
    },
    {
        title: 'Coursera for Students',
        description: 'Access free courses from top universities and companies.',
        link: 'https://www.coursera.org/courses?query=free&msockid=15d3e663034169d310b1f5c502ec6853',
        bcLink: 'https://th.bing.com/th/id/OIP.5VsJqpnQbBBiygjc-xgNogHaDt?w=350&h=175&c=7&r=0&o=5&pid=1.7',
        logo: 'https://th.bing.com/th/id/OIP.fGZBzvlXWywQI-AkrcH11wHaHa?w=161&h=180&c=7&r=0&o=5&pid=1.7'
    },
    {
        title: 'Overleaf Pro for Students',
        description: 'Free access to LaTeX for academic paper writing and projects.',
        link: 'https://www.overleaf.com/edu',
        bcLink: 'https://www.researchstash.com/wp-content/uploads/2018/01/Overleaf.jpg',
        logo: 'https://th.bing.com/th/id/OIP.cnPTzPd69mRqNcliRzzlbgHaHg?w=165&h=180&c=7&r=0&o=5&pid=1.7'
    },
    {
        title: 'Zotero',
        description: 'Free reference management software for academic writing.',
        link: 'https://www.zotero.org/',
        bcLink: 'https://th.bing.com/th/id/OIP.PinIXpv-F2ekMqVj-9_OwwHaE8?rs=1&pid=ImgDetMain',
        logo: 'https://th.bing.com/th/id/OIP.CH_X-rA943Rtqh1a0FZW8AHaHq?w=161&h=180&c=7&r=0&o=5&pid=1.7'
    },
    {
        title: 'NVIDIA Developer Program',
        description: 'Free tools and resources for AI, ML, and graphics programming.',
        link: 'https://developer.nvidia.com/developer-program',
        bcLink: 'https://th.bing.com/th/id/OIP.76TulXg4yXdn7JlcL75j5gHaC9?w=315&h=140&c=7&r=0&o=5&pid=1.7',
        logo: 'https://th.bing.com/th/id/OIP.Q3DXQWtqhX60cKdqfwnzDgHaHH?w=175&h=180&c=7&r=0&o=5&pid=1.7'
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
            <NavBar />
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