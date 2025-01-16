import React, { useEffect, useState } from 'react';
import axios from 'axios';

import './UserStats.css';

const UserStats = ({ username }) => {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.put(`/api/user/${username}`, {
                    
                });
                setUserData(response.data);
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
            setLoading(false);
        };

        fetchUserData();
    }, [username]);

    if (loading) {
        return <div>Loading...</div>;
    }

    const { matchedUser } = userData.data;

    return (
        <div className="user-stats-container">
            <div className="profile-section">
                <img
                    className="profile-avatar"
                    src={matchedUser.profile.userAvatar}
                    alt={matchedUser.profile.realName}
                />
                <div className="profile-info">
                    <h1>{matchedUser.profile.realName}</h1>
                    <p>{matchedUser.profile.aboutMe}</p>
                    <p><strong>School:</strong> {matchedUser.profile.school}</p>
                    <p><strong>Reputation:</strong> {matchedUser.profile.reputation}</p>
                    <p><strong>Skill Tags:</strong> {matchedUser.profile.skillTags.join(', ')}</p>
                </div>
            </div>

            <div className="badges-section">
                <h3>Badges</h3>
                <div className="badges-container">
                    {matchedUser.badges.map((badge) => (
                        <div key={badge.id} className="badge">
                            <img src={badge.icon} alt={badge.displayName} />
                            <p>{badge.displayName}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="upcoming-badges-section">
                <h3>Upcoming Badges</h3>
                <div className="upcoming-badges">
                    {matchedUser.upcomingBadges.map((badge, idx) => (
                        <div key={idx} className="upcoming-badge">
                            <img src={badge.icon} alt={badge.name} />
                            <p>{badge.name}</p>
                            <p>Progress: {badge.progress}%</p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="stats-section">
                <h3>Statistics</h3>
                <div className="stats-grid">
                    <div className="stat-item">
                        <h4>Active Days</h4>
                        <p>{matchedUser.userCalendar.totalActiveDays} days</p>
                    </div>
                    <div className="stat-item">
                        <h4>Streak</h4>
                        <p>{matchedUser.userCalendar.streak} days</p>
                    </div>
                </div>

                <h4>Submission Stats</h4>
                <div className="submission-stats">
                    {matchedUser.submitStats.acSubmissionNum.map((submission, idx) => (
                        <div key={idx} className="submission-stat">
                            <h5>{submission.difficulty}</h5>
                            <p>Accepted: {submission.count}</p>
                            <p>Submissions: {submission.submissions}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="contest-ranking-section">
                <h3>Contest Ranking</h3>
                <div className="contest-rank-info">
                    <p><strong>Rating:</strong> {matchedUser.userContestRanking.rating}</p>
                    <p><strong>Global Ranking:</strong> {matchedUser.userContestRanking.globalRanking}</p>
                    <p><strong>Top Percentage:</strong> {matchedUser.userContestRanking.topPercentage}%</p>
                    <p><strong>Attended Contests:</strong> {matchedUser.userContestRanking.attendedContestsCount}</p>
                </div>
            </div>
        </div>
    );
};

export default UserStats;
