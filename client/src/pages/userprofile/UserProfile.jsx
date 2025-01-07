import React, { useDeferredValue, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "@api";

import EditUser from "./edits/EditUser";
import EditMail from "./edits/EditMail";
import EditFrnd from "./edits/EditFrnd";
import Navbar from "../../ui/navbar/NavBar";
import Spinner from "../spinner/Spinner";

import frnds from '../assests/friend.png';
import email from '../assests/gmail.png';
import gfg from '../assests/gfg.png';
import youtube from '../assests/youtube.png';
import edit from '../assests/edit.png';
import log from '../assests/log-out.png';
import def from '../assests/default-other.jpg';
import boy from '../assests/default-boy.jpg';
import girl from '../assests/default-girl.jpg';

import "./layout.css";
import "./elements.css";

const UserProfile = () => {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);
	const [showEdit, setShowEdit] = useState(false);
	const [showFrnd, setShowFrnd] = useState(false);
	const [showMail, setShowMail] = useState(false);
	const [edited, setEdited] = useState(false);
	const [recommendedQuestions, setRecommendedQuestions] = useState([]);
	const [recommendedTopics, setRecommendedTopics] = useState([]);

	const navigate = useNavigate();
	const userId = localStorage.getItem("id");

	useEffect(() => {
		if(sessionStorage.getItem('token')) {
			const token = sessionStorage.getItem('token');
			localStorage.setItem('token', token);
		} else {
			localStorage.clear();
			sessionStorage.clear();
			navigate('/login');
		}
	}, []);

	useEffect(() => {
		const fetchUserData = async () => {
			setLoading(true);
			try {
				const response = await Axios.get(`/api/meta/${userId}`);
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
	}, [userId, edited]);

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
							senderProfilePhoto: senderResponse.data.profilePhoto,
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
							senderProfilePhoto: senderResponse.data.profilePhoto,
							topicName: topicResponse.data.name,
							topicDescription: topicResponse.data.description,
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

	let profileImage = def;
	if (user) {
		profileImage = user.profilePhoto ||
			(user.gender === 'Male' ? boy :
				user.gender === 'Female' ? girl : def);
	}

	const handleLogout = () => {
		setUser(null);
		localStorage.clear();
		sessionStorage.clear();
		navigate("/login");
	}

	const handleSolve = (questionLink) => {
		if (questionLink) {
			window.open(questionLink, "_blank");
		}
	};

	if (loading) {
		return <Spinner />;
	}

	if (!user) {
		return <div>User not found</div>;
	}


	return (
		<section className="user-profile">
			<Navbar edited={edited} />

			{/* Main Layout */}
			<div className="profile-layout">

				{/* Left Section: User Information */}
				<div className="profile-left">
					<div className="profile-info">
						<h2>{user.username.toUpperCase()}'s Profile</h2>
						<div className="profile-photo">
							{user.profilePhoto ? (
								<img
									className="profile-img"
									src={user.profilePhoto}
									alt="Profile"
								/>
							) : (
								<img
									className="profile-img"
									src={profileImage}
									alt="Profile"
								/>
							)}
						</div>
						<div className="profile-details">
							<p><strong>Email:</strong> {user.email}</p>
							<p><strong>Gender:</strong> {user.gender}</p>
							<p><strong>Date of Birth:</strong> {user.dob ? new Date(user.dob).toLocaleDateString() : "Not available"}</p>
							<p><strong>Preferred Language:</strong> {user.gotoLanguage || "Not specified"}</p>
							<p><strong>Bio:</strong> {user.bio}</p>
						</div>
					</div>
					<button className="edit-btn" onClick={() => setShowEdit(true)}>
						<img src={edit} alt='e' />
						Edit Profile</button>
					{showEdit && <EditUser onClose={() => setShowEdit(false)} user={user} onEdit={() => setEdited(!edited)} />}
				</div>

				{/* Right Section */}
				<div className="profile-right">

					{/* Mail Component Button */}
					{showMail && <EditMail onClose={() => setShowMail(false)} />}
					<div className="top-buttons">
						<div className="left-btns">
							<button className="frnds-btn" onClick={() => setShowFrnd(true)}>
								<img src={frnds} alt="Edit Friends" />
								Manage Friends
							</button>
							<button className="mail-btn" onClick={() => setShowMail(true)}>
								<img src={email} alt="Mail" />
							</button>
						</div>
						<button className="logout-btn" onClick={handleLogout}>
							<img src={log} alt="LogOut" />
						</button>
					</div>


					{/* Top Section: Friends and Requests */}
					{showFrnd && <EditFrnd onClose={() => setShowFrnd(false)} user={user} onEdit={() => setEdited(!edited)} />}
					<div className="friends-info-container">
						<div className="friends-info-box">
							<h4>Friends</h4>
							<p className="friends-count">{user.friends.length || 0}</p>
						</div>
						<div className="friends-info-box">
							<h4>Friend Requests</h4>
							<p className="requests-count">{user.friendRequests.length || 0}</p>
						</div>
					</div>

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
							<div key={index} className="question-card">
								{/* Sender Profile Section */}
								<div className="sender-info">
									<img
										className="sender-img"
										src={question.senderProfilePhoto || def}
										alt="Sender Profile"
									/>
									<p className="sender-username"> Sender Name: <strong>{question.senderUsername || "Unknown"} </strong></p>
									<button className="view-profile" onClick={() => navigate(`/profile/${question.senderId}`)}>
										view profile
									</button>
								</div>

								{/* Question Details */}
								<div className="question-details">
									<h4 className="question-name">{question.questionName}</h4>
									<p className="question-topic">
										<strong>Topic:</strong> {question.questionTopic || "Not Specified"}
									</p>
									<p className="question-difficulty">
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
							<div key={index} className="question-card">
								{/* Sender Profile Section */}
								<div className="sender-info">
									<img
										className="sender-img"
										src={question.senderProfilePhoto || def}
										alt="Sender Profile"
									/>
									<p className="sender-username"> Sender Name: <strong>{question.senderUsername || "Unknown"} </strong></p>
									<button className="view-profile" onClick={() => navigate(`/profile/${question.senderId}`)}>
										view profile
									</button>
								</div>

								{/* Question Details */}
								<div className="topic-details">
									<h4 className="topic-name">{question.topicName}</h4>
									<div className="topic-links">
										<img onClick={() => handleSolve(question.youtubeLink)} src={youtube} alt="Youtube.png"/>
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
