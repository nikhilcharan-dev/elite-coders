import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { DayProvider } from './ui/daycontext/DayContext';

import Home from './pages/home/Home';
import Compete from './pages/compete/Compete';
import LoginPage from "./ui/loginpage/LoginPage";
import Practice from './pages/practise/Practise';
import CheatSheet from './pages/cspage/CheatSheet';
import Adventurer from './pages/adventurer/Adventurer';
import CheatSheetDetail from './pages/cspage/CheatSheetDetail';
import UserProfile from './pages/userprofile/UserProfile';
import RegisterPage from "./ui/registerpage/RegisterPage";
import ProfilePhotoUpload from './pages/demo/ProfilePhotUpload';

// testing components
import PopTest from './pages/demo/PopTest';

function App() {
	
	const routes = [
		{ path: '/', element: <Home /> },
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

	const router = createBrowserRouter(routes);
	
	return (
		<DayProvider>
			<RouterProvider router={router} />
		</DayProvider>
	);
};

export default App;