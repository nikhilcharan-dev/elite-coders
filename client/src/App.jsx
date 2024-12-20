import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { DayProvider } from './ui/daycontext/DayContext';

import Home from './pages/Home';
import LoginPage from "./ui/loginpage/LoginPage";
import RegisterPage from "./ui/registerpage/RegisterPage";

function App() {

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Home/>
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
      element: <h1>404 Not Found</h1>
    }
  ]);

  return (
    <DayProvider>
      <RouterProvider router={router}/>
    </DayProvider>
  );
};

export default App;