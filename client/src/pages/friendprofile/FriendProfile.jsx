import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Axios from "@api";

import Navbar from "../../ui/navbar/NavBar";
import Spinner from "../spinner/Spinner";

import edit from '../assests/edit.png';
import log from '../assests/log-out.png';
import def from '../assests/default-other.jpg';
import boy from '../assests/default-boy.jpg';
import girl from '../assests/default-girl.jpg';

import "./FriendProfile.css";

const UserProfile = () => {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);

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

	let profileImage = def;
	if (user) {
		profileImage = user.profilePhoto ||
			(user.gender === 'Male' ? boy :
				user.gender === 'Female' ? girl : def);
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
