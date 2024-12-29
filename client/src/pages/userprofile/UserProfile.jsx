import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "@api";

import EditUser from "./edits/EditUser";
import EditMail from "./edits/EditMail";
import EditFrnd from "./edits/EditFrnd";
import Navbar from "../../ui/navbar/NavBar";
import Spinner from "../spinner/Spinner";

import frnds from '../assests/friend.png';
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
	const [showFrnd, setShowFrnd] = useState(false);
	const [showMail, setShowMail] = useState(false);
	const [edited, setEdited] = useState(false);

	const navigate = useNavigate();
	const userId = localStorage.getItem("id");

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
	}, [userId, edited]);

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
					{showMail && <EditMail onClose={() => setShowMail(false) } />}
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
					{showFrnd && <EditFrnd onClose={() => setShowFrnd(false)} user={user} onEdit={() => setEdited(!edited)}/>}
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
