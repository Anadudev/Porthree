import React from 'react';
import ReactDOM from 'react-dom/client';
// import App from './App.jsx';
import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import Error from './pages/Error.jsx';
import Portfolios from './pages/Portfolios.jsx';
import Portfolio from './pages/Portfolio.jsx';
import Posts from './pages/Posts.jsx';
import Post from './pages/Post.jsx';
import Projects from './pages/Projects.jsx';
import Project from './pages/Project.jsx';
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';
import PasswordReset from './pages/PasswordReset.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Logout from './components/Dashboard/Logout.jsx';

import './index.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <Error />,
  },
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "/portfolios",
    element: <Portfolios />,
  },
  {
    path: "/:username",
    element: <Portfolio />,
  },
  {
    path: "/:username/posts",
    element: <Posts />,
  },
  {
    path: "/:username/post/:slug",
    element: <Post />,
  },
  {
    path: "/:username/projects",
    element: <Projects />,
  },
  {
    path: "/:username/projects/:slug",
    element: <Project />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/logout",
    element: <Logout />,
  },
  {
    path: "/password_reset",
    element: <PasswordReset />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/dashboard/:user_name",
    element: <Dashboard />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
