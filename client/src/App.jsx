import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { DayProvider } from './ui/daycontext/DayContext';

import Home from './pages/home/Home';
import LoginPage from "./ui/loginpage/LoginPage";
import Adventurer from './pages/adventurer/Adventurer';
import Practice from './pages/practise/Practise';
import UserProfile from './pages/userprofile/UserProfile';
import RegisterPage from "./ui/registerpage/RegisterPage";
import ProfilePhotoUpload from './pages/demo/ProfilePhotUpload';

// testing components
import PopTest from './pages/demo/poptest';

function App() {
	
	const router = createBrowserRouter([
		{
			path: '/',
			element: <Home />
		},
		{
			path: '/practise',
			element: <Practice />
		},
		{
			path: '/user/:id',
			element: <UserProfile />
		},
		{
			path: '/login',
			element: <LoginPage />
		},
		{
			path: '/register',
			element: <RegisterPage />
		},
		{
			path: '*',
			element: <Adventurer />
		},
		{
			path: '/photo',
			element: <ProfilePhotoUpload />
		},
		{
			path: '/test',
			element: <PopTest />
		}
	]);
	
	return (
		<DayProvider>
			<RouterProvider router={router} />
		</DayProvider>
	);
};

export default App;