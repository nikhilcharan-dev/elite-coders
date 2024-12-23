import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Edit from "./Edit";
import Mail from "./Mail";
import Navbar from "../../ui/navbar/NavBar";
import Spinner from "../spinner/Spinner";

import email from '../assests/gmail.png';
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
	const [showMail, setShowMail] = useState(false);
	
	const navigate = useNavigate();
	const userId = localStorage.getItem("id");

	useEffect(() => {
		const fetchUserData = async () => {
			try {
				const BASE_URL = import.meta.env.VITE_BASE_URL;
				const response = await axios.get(`${BASE_URL}/api/users/${userId}`);
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
							<p><strong>Bio:</strong> {user.bio}</p>
							<p><strong>Preferred Language:</strong> {user.gotoLanguage || "Not specified"}</p>
						</div>
					</div>
					<button className="edit-btn" onClick={() => setShowEdit(true)}>
						<img src={edit} alt='e' />
						Edit Profile</button>
					{showEdit && <Edit onClose={() => setShowEdit(false)} user={user} />}
				</div>

				{/* Right Section */}
				<div className="profile-right">

					{/* Mail Component Button */}
					{showMail && <Mail onClose={() => setShowMail(false)} />}
					<div className="top-buttons">
						<button className="mail-btn" onClick={() => setShowMail(true)}>
							<img src={email} alt="Mail" />
						</button>
						<button className="logout-btn" onClick={handleLogout}>
							<img src={log} alt="LogOut" />
						</button>
					</div>


					{/* Top Section: Friends and Requests */}
					<div className="friends-info">
						<p><strong>Friends:</strong> {user.friends.length || 0}</p>
						<p><strong>Friend Requests:</strong> {user.friendRequests.length || 0}</p>
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
				{user.recommendedQuestions && user.recommendedQuestions.length > 0 ? (
					<ul>
						{user.recommendedQuestions.map((question, index) => (
							<li key={index}>{question}</li>
						))}
					</ul>
				) : (
					<p>No questions recommended yet.</p>
				)}
			</div>
		</section>
	);
};

export default UserProfile;
