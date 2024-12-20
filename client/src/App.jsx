import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { DayProvider } from './ui/daycontext/DayContext';

import Home from './pages/home/Home';
import LoginPage from "./ui/loginpage/LoginPage";
import Adventurer from './pages/adventurer/Adventurer';
import RegisterPage from "./ui/registerpage/RegisterPage";

function App() {

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Home/>
    },
    {
      path: '/profile',
      element: <Adventurer/>
    },
    {
      path: '/login',
      element: <LoginPage/>
    }, 
    {
      path: '/register',
      element: <RegisterPage/>
    },
    {
      path: '*',
      element: <Adventurer/>
    }
  ]);

  return (
    <DayProvider>
      <RouterProvider router={router}/>
    </DayProvider>
  );
};

export default App;