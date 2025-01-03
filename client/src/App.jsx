import React, { Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// pages & comps
import Home from './pages/home/Home';
import Social from './pages/social/Social';
import Spinner from './pages/spinner/Spinner';
import Compete from './pages/compete/Compete';
import LoginPage from "./ui/loginpage/LoginPage";
import Adventurer from './pages/adventurer/Adventurer';
import RegisterPage from "./ui/registerpage/RegisterPage";
const Learn = React.lazy(() => import('./pages/learn/Learn'));
const Practice = React.lazy(() => import('./pages/practise/Practise'));
const CheatSheet = React.lazy(() => import('./pages/cspage/CheatSheet.jsx'));
const UserProfile = React.lazy(() => import('./pages/userprofile/UserProfile'));
const CheatSheetDetail = React.lazy(() => import('./pages/cspage/CheatSheetDetail'))
const FriendProfile = React.lazy(()	=> import('./pages/friendprofile/FriendProfile'));

// testing components
import PopTest from './pages/demo/PopTest';

import './App.css';

const routes = [
	{ path: '/', element: <Home /> },
	{ path: '/learn', element: <Learn/> },
	{ path: '/practice', element: <Practice /> },
	{ path: '/compete', element: <Compete /> },
	{ path: '/social', element: <Social /> },
	{ path: '/user/:id', element: <UserProfile /> },
	{ path: '/login', element: <LoginPage /> },
	{ path: '/register', element: <RegisterPage /> },

	{ path: '/profile/:id', element: <FriendProfile /> },

	{ path: '/cheatsheets', element: <CheatSheet /> },
	{ path: '/cheatsheets/:name', element: <CheatSheetDetail /> },

	{ path: '*', element: <Adventurer /> },
	{ path: '/test', element: <PopTest /> },
];

function App() {

	const router = createBrowserRouter(routes);
	
	return (
		<Suspense fallback={<Spinner />}>
			<RouterProvider router={router} />
		</Suspense>
	);
};

export default App;