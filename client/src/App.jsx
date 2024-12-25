import React, { Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { DayProvider } from './ui/daycontext/DayContext';

import Home from './pages/home/Home';
import Learn from './pages/learn/Learn';
import Spinner from './pages/spinner/Spinner';
import Compete from './pages/compete/Compete';
import LoginPage from "./ui/loginpage/LoginPage";
import Practice from './pages/practise/Practise';
import CheatSheet from './pages/cspage/CheatSheet';
import Adventurer from './pages/adventurer/Adventurer';
import UserProfile from './pages/userprofile/UserProfile';
import RegisterPage from "./ui/registerpage/RegisterPage";
import CheatSheetDetail from './pages/cspage/CheatSheetDetail';
import ProfilePhotoUpload from './pages/demo/ProfilePhotUpload';

// testing components
import PopTest from './pages/demo/PopTest';

import './App.css';

const routes = [
	{ path: '/', element: <Home /> },
	{ path: '/learn', element: <Learn/> },
	{ path: '/practise', element: <Practice /> },
	{ path: '/compete', element: <Compete /> },
	{ path: '/user/:id', element: <UserProfile /> },
	{ path: '/login', element: <LoginPage /> },
	{ path: '/register', element: <RegisterPage /> },

	{ path: '/cheatsheets', element: <CheatSheet /> },
	{ path: '/cheatsheets/:name', element: <CheatSheetDetail /> },

	{ path: '*', element: <Adventurer /> },
	{ path: '/test', element: <PopTest /> },
	{ path: '/photo', element: <ProfilePhotoUpload /> }
];

function App() {

	const router = createBrowserRouter(routes);
	
	return (
		<Suspense fallback={<Spinner />}>
			<DayProvider>
				<RouterProvider router={router} />
			</DayProvider>
		</Suspense>
	);
};

export default App;