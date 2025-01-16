import React, { Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// pages & comps
import Home from './pages/home/Home';
import Social from './pages/social/Social';
import Spinner from './pages/spinner/Spinner';
import Compete from './pages/compete/Compete';
import Adventurer from './pages/adventurer/Adventurer';
import CodeBlooded from './pages/ashok/CodeBlooded.jsx';
const Learn = React.lazy(() => import('./pages/learn/Learn'));
const Practice = React.lazy(() => import('./pages/practise/Practise'));
const Resource = React.lazy(() => import('./pages/resources/Resource'));
import LoginRegisterPage from './ui/Authentication/LoginRegisterPage.jsx';
const CheatSheet = React.lazy(() => import('./pages/cspage/CheatSheet.jsx'));
const UserProfile = React.lazy(() => import('./pages/userprofile/UserProfile'));
const CheatSheetDetail = React.lazy(() => import('./pages/cspage/CheatSheetDetail'))
const FriendProfile = React.lazy(()	=> import('./pages/friendprofile/FriendProfile'));
const TopicDetail = React.lazy(() => import('./pages/ashok/topicDetail/TopicDetail.jsx'));

// testing components
import Intro from './ui/intro/Intro.jsx';
import Stats from "./pages/stats/Stats.jsx";


import './App.css';

const routes = [
	{ path: '/home', element: <Home /> },
	{ path: '/', element: <Intro /> },
	{ path: '/learn', element: <Learn/> },
	{ path: '/practice', element: <Practice /> },
	{ path: '/compete', element: <Compete /> },
	{ path: '/user/:id', element: <UserProfile /> },
	{ path: '/login', element: <LoginRegisterPage /> },
	{ path: '/social', element: <Social /> },
	{ path: '/social/meta/resources', element: <Resource /> },

	{ path: '/profile/:id', element: <FriendProfile /> },
	{ path: '/codeblood/dsa/:topic', element: <TopicDetail /> },
	{ path: '/codeblood/cp/:topic', element: <TopicDetail /> },

	{ path: '/cheatsheets', element: <CheatSheet /> },
	{ path: '/cheatsheets/:name', element: <CheatSheetDetail /> },

	{ path: '*', element: <Adventurer /> },
	{ path: '/Authentication', element: <Intro /> },
	{ path: '/test', element: <Stats /> },
	{ path: '/codeblood/curated', element: <CodeBlooded />}
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