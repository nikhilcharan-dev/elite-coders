import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Axios from "@api";

import Navbar from "../../ui/navbar/NavBar";
import Spinner from "../spinner/Spinner";

import def from '../assests/default-other.jpg';
import boy from '../assests/default-boy.jpg';
import girl from '../assests/default-girl.jpg';
import gfg from '../assests/gfg.png';
import youtube from '../assests/youtube.png';

import "./FriendProfile.css";

const UserProfile = () => {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);
	const [recommendedQuestions, setRecommendedQuestions] = useState([]);
	const [recommendedTopics, setRecommendedTopics] = useState([]);

	const navigate = useNavigate();
	const userId = useParams().id;

	useEffect(() => {
		const fetchUserData = async () => {
			setLoading(true);
			try {
				const response = await Axios.get(`${import.meta.env.VITE_BASE_URL}/api/meta/${userId}`);
				setUser(response.data);
				setLoading(false);
			} catch (error) {
				console.error("Error fetching user data:", error);
				setLoading(false);
			}
		};

		if (userId) {
			fetchUserData();
		}
	}, [userId]);

	useEffect(() => {
		const fetchRecommendedQuestions = async () => {
			if (user && user.recommendedQuestions) {
				const updatedQuestions = await Promise.all(
					user.recommendedQuestions.map(async (recommendation) => {
						const senderResponse = await Axios.get(
							`/api/meta/${recommendation.senderId}`
						);
						const questionResponse = await Axios.get(
							`/api/questions/${recommendation.questionLink}`
						);

						return {
							senderId: recommendation.senderId,
							senderUsername: senderResponse.data.username,
							profilePhoto: senderResponse.data.profilePhoto,
							gender: senderResponse.data.gender,
							questionName: questionResponse.data.name,
							questionTopic: questionResponse.data.topics.join(', '),
							questionLink: questionResponse.data.link,
							questionDifficulty: questionResponse.data.difficulty,
						};
					})
				);

				setRecommendedQuestions(updatedQuestions);
			}
		};

		const fetchRecommendedTopics = async () => {
			if (user && user.recommendedTopics) {
				const updatedTopics = await Promise.all(
					user.recommendedTopics.map(async (recommendation) => {
						const senderResponse = await Axios.get(
							`/api/meta/${recommendation.senderId}`
						);

						const topicResponse = await Axios.get(
							`/api/topics/${recommendation.topicId}`
						);

						return {
							senderId: recommendation.senderId,
							senderUsername: senderResponse.data.username,
							profilePhoto: senderResponse.data.profilePhoto,
							gender: senderResponse.data.gender,
							topicName: topicResponse.data.name,
							youtubeLink: topicResponse.data.youtubeLink,
							gfgLink: topicResponse.data.gfgLink
						};
					})
				);

				setRecommendedTopics(updatedTopics);
				console.log(updatedTopics);
			}
		}

		fetchRecommendedQuestions();
		fetchRecommendedTopics();

	}, [user]);

	const getProfileImage = (person) => {
		return (
			person.profilePhoto ? person.profilePhoto :
				person.gender === 'Male' ? boy : person.gender === 'Female' ? girl :
					def
		);
	}

	const handleSolve = (link) => {
		window.open(link, '__blank')
	}

	if (loading) {
		return <Spinner />;
	}

	if (!user) {
		return <div>User not found</div>;
	}

	return (
		<section className="user-profile">
			<Navbar />

			{/* Main Layout */}
			<div className="profile-layout">

				{/* Left Section: User Information */}
				<div className="profile-left">
					<div className="profile-info">
						<h2>{user.username.toUpperCase()}'s Profile</h2>
						<div className="profile-photo">
							<img
								className="profile-img"
								src={getProfileImage(user)}
								alt="Profile"
							/>
						</div>
						<div className="profile-details">
							<p><strong>Email:</strong> {user.email}</p>
							<p><strong>Gender:</strong> {user.gender}</p>
							<p><strong>Date of Birth:</strong> {user.dob ? new Date(user.dob).toLocaleDateString() : "Not available"}</p>
							<p><strong>Preferred Language:</strong> {user.gotoLanguage || "Not specified"}</p>
							<p><strong>Bio:</strong> {user.bio}</p>
						</div>
					</div>
				</div>

				{/* Right Section */}
				<div className="profile-right">

					{/* Bottom Section: Achievements */}
					<div className="achievements">
						<h2>Achievements</h2>
						<p>Unlocks Soon!</p>
					</div>
				</div>
			</div>

			{/* Bottom Section: Recommended Questions */}
			<div className="recommendations">
				<h3>Recommended Questions</h3>
				{recommendedQuestions && recommendedQuestions.length > 0 ? (
					<ul>
						{recommendedQuestions.map((question, index) => (
							<div key={index} className="fquestion-card">
								{/* Sender Profile Section */}
								<div className="sender-info" onClick={() => navigate(`/profile/${question.senderId}`)}>
									<img
										className="sender-img"
										src={getProfileImage(question)}
										alt="Sender Profile"
									/>
									<p className="sender-username"><strong>{question.senderUsername || "Unknown"} </strong></p>
								</div>

								{/* Question Details */}
								<div className="fquestion-details">
									<h4 className="fquestion-name">{question.questionName}</h4>
									<p className="fquestion-topic">
										<strong>Topic:</strong> {question.questionTopic || "Not Specified"}
									</p>
									<p className="fquestion-difficulty">
										<strong>Difficulty:</strong> {question.questionDifficulty || "Not Specified"}
									</p>
									<button
										className="solve-btn"
										onClick={() => handleSolve(question.questionLink)}
									>
										Solve
									</button>
								</div>
							</div>
						))}
					</ul>
				) : (
					<p>No new Questions recommended.</p>
				)}
			</div>

			{/* Recommended Topics */}
			<div className="recommendations">
				<h3>Recommended Topics</h3>
				{recommendedTopics && recommendedTopics.length > 0 ? (
					<ul>
						{recommendedTopics.map((question, index) => (
							<div key={index} className="fquestion-card">
								{/* Sender Profile Section */}
								<div className="sender-info" onClick={() => navigate(`/profile/${question.senderId}`)}>
									<img
										className="sender-img"
										src={getProfileImage(question)}
										alt="Sender Profile"
									/>
									<p className="sender-username"><strong>{question.senderUsername || "Unknown"} </strong></p>
								</div>

								{/* Question Details */}
								<div className="topic-details">
									<h4 className="topic-name">{question.topicName}</h4>
									<div className="topic-links">
										<img onClick={() => handleSolve(question.youtubeLink)} src={youtube} alt="Youtube.png" />
										<img onClick={() => handleSolve(question.gfgLink)} src={gfg} alt="GFG.png" />
									</div>
								</div>
							</div>
						))}
					</ul>
				) : (
					<p>No new Topics recommended.</p>
				)}
			</div>
		</section>
	);
};

export default UserProfile;
