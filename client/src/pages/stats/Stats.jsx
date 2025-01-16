import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Burger from '../../ui/burgernav/Burger';

import './Stats.css';

const getDate = (data) => {
    const parsedDate = new Date(data);

    const year = parsedDate.getFullYear();
    let month = parsedDate.getMonth() + 1;
    const date = parsedDate.getDate();

    switch (month) {
        case 1:
            month = "January";
            break;
        case 2:
            month = "February";
            break;
        case 3:
            month = "March";
            break;
        case 4:
            month = "April";
            break;
        case 5:
            month = "May";
            break;
        case 6:
            month = "June";
            break;
        case 7:
            month = "July";
            break;
        case 8:
            month = "August";
            break;
        case 9:
            month = "September";
            break;
        case 10:
            month = "October";
            break;
        case 11:
            month = "November";
            break;
        case 12:
            month = "December";
            break;
        default:
            month = "Unknown";
            break;
    }

    return year + " " + month + " " + date;
};

const Stats = () => {
    const [statsData, setStatsData] = useState({
        leetcode: null,
        codechef: null,
        codeforces: null,
    });

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStatsData = async () => {
            try {
                const response = await axios.put('http://localhost:5010/api/stats/', {
                    lcusername: 'NIKHILCHARAN',
                    year: new Date().getFullYear(),
                    ccusername: 'nikiru',
                    cfusername: 'nikiru',
                });

                console.log(response.data);

                setStatsData({
                    leetcode: response.data.leetcode,
                    codechef: response.data.codechef,
                    codeforces: response.data.codeforces,
                });
                setLoading(false);
            } catch (error) {
                console.error('Error fetching stats data:', error);
                setLoading(false);
            }
        };

        fetchStatsData();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="stats-page">
            <Burger />
            <h1>Stats Overview</h1>

            {/* LeetCode Stats */}
            {statsData.leetcode && (
                <div className="leetcode stats">
                    <div class="profile-data">
                        <img src="/images/LEETCODE.png" alt='LeetCode' />
                        <div className='side'/>
                        <h2>LeetCode</h2>
                    </div>
                    <div className="profile lc">
                        <div className='lc-data'>
                            <img src={statsData.leetcode.matchedUser.profile.userAvatar} alt="LeetCode Avatar" />
                            <p>User: {statsData.leetcode.matchedUser.profile.realName}</p>
                            <p className='quote'>{statsData.leetcode.matchedUser.profile.aboutMe}</p>
                            <p>Ranking: {statsData.leetcode.matchedUser.profile.ranking}</p>
                            <p>Certification Level: {statsData.leetcode.matchedUser.profile.certificationLevel}</p>
                            <p>Reputation: {statsData.leetcode.matchedUser.profile.reputation}</p>
                            <p>School: {statsData.leetcode.matchedUser.profile.school}</p>
                            <p>Skill Tags: {statsData.leetcode.matchedUser.profile.skillTags.map((tag) => tag.toUpperCase()).join(' , ')}</p>
                        </div>
                        <div className="badges">
                            <h3>Badges</h3>
                            {statsData.leetcode.matchedUser.badges.map((badge) => (
                                <div key={badge.id} className="badge">
                                    <img src={badge.name !== "Daily Coding Challenge" ? badge.icon : `https://leetcode.com/${badge.icon}`} alt={badge.name} />
                                    <p>{badge.displayName}</p>
                                </div>
                            ))}
                            <h3>Upcoming Badges</h3>
                            {statsData.leetcode.matchedUser.upcomingBadges.map((badge) => (
                                <div key={badge.id + badge.name} className="badge">
                                    <p>{badge.name}</p>
                                    <p>Progress: {badge.progress}%</p>
                                </div>
                            ))}
                        </div>
                        <div className="lc-stats">
                            <div className='ac-subs'>
                                <h3>Accepted Submissions</h3>
                                {statsData.leetcode.matchedUser.submitStats.acSubmissionNum.map((submission) => (
                                    <div key={submission.difficulty}>
                                        <p>{submission.difficulty}: {submission.count} correct submissions</p>
                                    </div>
                                ))}
                            </div>
                            <div className='total-subs'>
                                <h3>Total Submissions</h3>
                                {statsData.leetcode.matchedUser.submitStats.totalSubmissionNum.map((submission) => (
                                <div key={submission.difficulty}>
                                    <p>{submission.difficulty}: {submission.count} correct submissions</p>
                                </div>
                            ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* CodeChef Stats */}
            {statsData.codechef && (
                <div className="codechef stats">
                    <div class="profile-data">
                        <img src="/images/CODECHEF.png" alt='CodeChef' />
                        <div className='side'/>
                        <h2>CodeChef</h2>
                    </div>
                    <div className="profile">
                        <div className='cc'>
                            <img src={statsData.codechef.profile} alt="CodeChef Avatar" />
                            <p>{statsData.codechef.name} ({statsData.codechef.countryName})</p>
                            <p>Current Rating: {statsData.codechef.currentRating}</p>
                            <p>Country Rank: {statsData.codechef.countryRank}</p>
                        </div>
                        <div className="heatmap">
                            <h3>Heatmap</h3>
                            {statsData.codechef.heatMap.map((entry, index) => (
                                <div key={index}>
                                    <p>{getDate(entry.date)}: {entry.value} problems solved</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* CodeForces Stats */}
            {statsData.codeforces && (
                <div className="codeforces stats">
                    <div class="profile-data">
                        <img src="/images/CODEFORCES.png" alt='CodeForces' />
                        <div className='side'/>
                        <h2>CodeForces</h2>
                    </div>
                    <div className="profile cf">
                        <img src={statsData.codeforces.result[0].avatar} alt="CodeForces Avatar" />
                        <div className='cf-data'>
                            <p>{statsData.codeforces.result[0].handle}</p>
                            <p>Friends: {statsData.codeforces.result[0].friendOfCount}</p>
                            <p>Rating: {statsData.codeforces.result[0].rating}</p>
                            <p>Rank: {statsData.codeforces.result[0].rank}</p>
                            <p>Max Rating: {statsData.codeforces.result[0].maxRating}</p>
                            <p>Contributions: {statsData.codeforces.result[0].contribution}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Stats;
