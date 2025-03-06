import React, { useState, useEffect, PureComponent } from 'react';
import Axios from '@api';
import Burger from '../../ui/burgernav/Burger';
import { DotLoader } from 'react-spinners';

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
        leetcode: "",
        geeksforgeeks: "",
        codechef: "",
        codeforces: "",
    });

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [showEdit, setShowEdit] = useState(false);


    useEffect(() => {
        const getMetaData = async () => {
            let userHandles = null;
            try {
                setLoading(true);
                if (localStorage.getItem('userData') && !showEdit) {
                    const res = JSON.parse(localStorage.getItem('userData'));
                    userHandles = res.handle;
                } else {
                    const res = await Axios.get(`/api/meta/${localStorage.getItem('id')}`);
                    userHandles = res.data.handle;
                }

                setUser(userHandles);

                const response = await Axios.put('/api/stats/', {
                    lcusername: userHandles?.leetcode || "",
                    year: new Date().getFullYear(),
                    ggusername: userHandles?.geeksforgeeks || "",
                    ccusername: userHandles?.codechef || "",
                    cfusername: userHandles?.codeforces || "",
                });

                setStatsData({
                    leetcode: response.data?.leetcode,
                    geeksforgeeks: response.data?.geeksforgeeks,
                    codechef: response.data?.codechef,
                    codeforces: response.data?.codeforces,
                });

                setLoading(false);
            } catch (err) {
                console.error("Error fetching user meta data:", err);
            }
        }

        getMetaData();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await Axios.put(`/api/meta/${localStorage.getItem('id')}`, {
                leetcode: user.leetcode,
                geeksforgeeks: user.geeksforgeeks,
                codechef: user.codechef,
                codeforces: user.codeforces,
            });

            localStorage.setItem('userData', JSON.stringify(res.data));
            alert(`Handles updated successfully`);
            setShowEdit(!showEdit);
        } catch (err) {
            console.error("Error updating user handles:", err);
        }
    }

    const handleInputChange = (event) => {
        setUser((prev) => ({
            ...prev,
            [event.target.name]: event.target.value,
        }));
    }

    const openHandleEdit = () => {
        setShowEdit(prev => !prev);
    }

    const openProfile = () => {
        console.log("Openinig", `https://leetcode.com/${user.leetcode}`);
        window.open(`https://leetcode.com/${user.leetcode}`, "_blank")
    }

    if (loading) {
        return (
            <div className='popup-overlay' style={{ backgroundColor: "white" }}>
                <DotLoader
                    size={60}
                    color='black' />
            </div>
        );
    }

    return (
        <div className="stats-page">
            <Burger />

            {
                showEdit &&
                <section className='edit-handle-container'>
                    <h1>Edit User Handles</h1>
                    <form className='handle-container' onSubmit={handleSubmit}>
                        <label>
                            https://leetcode.com/u/
                            <input type='text' placeholder='Enter Valid Username'
                                id="leetcode"
                                name="leetcode"
                                value={user.leetcode}
                                onChange={handleInputChange}
                            />
                        </label>
                        <label>
                            https://www.codechef.com/users/
                            <input type='text' placeholder='Enter Valid Username'
                                id="codechef"
                                name="codechef"
                                value={user.codechef}
                                onChange={handleInputChange} />
                        </label>
                        <label>
                            https://codeforces.com/profile/
                            <input type='text' placeholder='Enter Valid Username'
                                id="codeforces"
                                name="codeforces"
                                value={user.codeforces}
                                onChange={handleInputChange} />
                        </label>
                        <label>
                            https://www.geeksforgeeks.org/user/
                            <input type='text' placeholder='Enter Valid Username'
                                id="geeksforgeeks"
                                name="geeksforgeeks"
                                value={user.geeksforgeeks}
                                onChange={handleInputChange}
                            />
                        </label>

                        <div className='user-handle-buttons'>
                            <button className='handle-save' type='submit'>Save Changes</button>
                            <button className='edit-handle-close' onClick={() => setShowEdit(!showEdit)}>Close</button>
                        </div>

                    </form>
                </section>
            }

            {/* Stats Navigation */}
            <h1>Stats Overview</h1>
            <div className='user-profile-handles'>
                <img src='/images/LEETCODE.png' alt='LeetCode' onClick={() => openProfile(`https://leetcode.com/${user.leetcode}`)} />
                <img src='/images/GFG.png' alt='GeeksforGeeks' onClick={() => openProfile(`https://www.geeksforgeeks.org/user/${user.geeksforgeeks}`)} />
                <img src='/images/CODECHEF.png' alt='CodeChef' onClick={() => openProfile(`https://www.codechef.com/users/${user.codechef}`)} />
                <img src='/images/CODEFORCES.png' alt='CodeForces' onClick={() => openProfile(`https://www.codechef.com/users/${user.codeforces}`)} />
                <div className='user-handle-edit'>
                    <img src='/images/edit.png' onClick={openHandleEdit} />
                </div>
            </div>

            {/* Leetcode data */}
            {statsData.leetcode ? (
                <div className="leetcode stats">
                    <div className="profile-data">
                        <img src="/images/LEETCODE.png" alt='LeetCode' />
                        <div className='side' />
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
                                    <p className='progess'>Progress: {badge.progress}%</p>
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
            ) : (
                <div className="no-data">
                    <p>No LeetCode data available. Please add your handles.</p>
                </div>
            )}

            {/* CodeChef data */}
            {statsData.leetcode ? (
                <div className="codechef stats">
                    <div className="profile-data">
                        <img src="/images/CODECHEF.png" alt='CodeChef' />
                        <div className='side' />
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
            ) : (
                <div className="no-data">
                    <p>No CodeChef data available. Please add your handles.</p>
                </div>
            )}

            {/* CodeForces data */}
            {statsData.leetcode ? (
                <div className="codeforces stats">
                    <div className="profile-data">
                        <img src="/images/CODEFORCES.png" alt='CodeForces' />
                        <div className='side' />
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
            ) : (
                <div className="no-data">
                    <p>No Codeforces data available. Please add your handles.</p>
                </div>
            )}

            {/* GeeksforGeeks data */}
            {statsData.geeksforgeeks ? (
                <div className="geeksforgeeks stats">
                    <div className="profile-data">
                        <img src="/images/GFG.png" alt='GeeksforGeeks' />
                        <div className='side' />
                        <h2>GeeksforGeeks</h2>
                    </div>
                    <div className="profile gfg">
                        <img src={statsData.geeksforgeeks.info.profilePicture} alt="GeeksForGeeks Avatar" />
                        <div className='gg-data'>
                            <p>{statsData.geeksforgeeks.info.username}</p>
                            <p>Institution: {statsData.geeksforgeeks.info.institute}</p>
                            <p>Ranking: {statsData.geeksforgeeks.info.instituteRank}</p>
                            <p>Coding Score: {statsData.geeksforgeeks.info.codingScore}</p>
                            <div className='s-m-h'> 
                                <p>Problems Solved: {statsData.geeksforgeeks.info.totalProblemsSolved}</p>
                                <p>Small: {statsData.geeksforgeeks.solvedStats.easy.count}</p>
                                <p>Medium: {statsData.geeksforgeeks.solvedStats.medium.count}</p>
                                <p>Hard: {statsData.geeksforgeeks.solvedStats.hard.count}</p>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="no-data">
                    <p>GeeksForGeeks Stats will be available soon..</p>
                </div>
            )}
        </div>
    );
};

export default Stats;
