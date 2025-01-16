import React from 'react';

import './UserStats.css';

const UserStats = ({ leetcode, codechef, codeforces }) => {
    return (
        <section className="user-stats">
            <h1>User Stats</h1>

            {/* LeetCode Section */}
            <div className="stat-section">
                <h2>LeetCode</h2>
                <img
                    src="https://leetcode.com/static/images/LeetCode_Sharing.png"
                    alt="LeetCode"
                    className="platform-logo"
                />
                <p><strong>Total Solved:</strong> {leetcode.totalSolved}/{leetcode.totalQuestions}</p>
                <p><strong>Easy:</strong> {leetcode.easySolved}/{leetcode.totalEasy}</p>
                <p><strong>Medium:</strong> {leetcode.mediumSolved}/{leetcode.totalMedium}</p>
                <p><strong>Hard:</strong> {leetcode.hardSolved}/{leetcode.totalHard}</p>
                <p><strong>Acceptance Rate:</strong> {leetcode.acceptanceRate}%</p>
                <p><strong>Ranking:</strong> #{leetcode.ranking}</p>
                <p><strong>Contribution Points:</strong> {leetcode.contributionPoints}</p>
            </div>

            {/* CodeChef Section */}
            <div className="stat-section">
                <h2>CodeChef</h2>
                <img src={codechef.profile} alt="CodeChef Profile" className="profile-image" />
                <p><strong>Name:</strong> {codechef.name}</p>
                <p><strong>Current Rating:</strong> {codechef.currentRating}</p>
                <p><strong>Highest Rating:</strong> {codechef.highestRating}</p>
                <p><strong>Global Rank:</strong> #{codechef.globalRank}</p>
                <p><strong>Country:</strong> {codechef.countryName}
                    <img src={codechef.countryFlag} alt="Country Flag" className="flag" />
                </p>
                <p><strong>Stars:</strong> {codechef.stars}</p>
            </div>

            {/* Codeforces Section */}
            <div className="stat-section">
                <h2>Codeforces</h2>
                <img src={codeforces.avatar} alt="Codeforces Avatar" className="profile-image" />
                <p><strong>Handle:</strong> {codeforces.handle}</p>
                <p><strong>Rank:</strong> {codeforces.rank}</p>
                <p><strong>Rating:</strong> {codeforces.rating}</p>
                <p><strong>Max Rank:</strong> {codeforces.maxRank}</p>
                <p><strong>Max Rating:</strong> {codeforces.maxRating}</p>
                <p><strong>Contributions:</strong> {codeforces.contribution}</p>
            </div>
        </section>
    );
};

export default UserStats;
