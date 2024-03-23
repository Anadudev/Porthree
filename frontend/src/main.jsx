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
import Profile from './components/Dashboard/Profile';
import EditProfile from './components/Dashboard/EditProfile';
import DashboardPosts from './components/Dashboard/DashboardPosts';
import DashboardProjects from './components/Dashboard/DashboardProjects';
import NewPost from './components/Dashboard/NewPost';
import NewProject from './components/Dashboard/NewProject';
import DraftProject from './components/Dashboard/DraftProject';
import DraftPost from './components/Dashboard/DraftPost';
import EditProject from './components/Dashboard/EditProject';
import EditPost from './components/Dashboard/EditPost';
import Bio from './components/Dashboard/Bio';
import EditBio from './components/Dashboard/EditBio';

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
    children: [
      {
        path: "/dashboard/:user_name/profile",
        element: <Profile />,
        children: [
          {
            path: "/dashboard/:user_name/profile/edit",
            element: <EditProfile />,
          },
        ]
      },
      {
        path: "/dashboard/:user_name/posts",
        element: <DashboardPosts />,
        children: [
          {
            path: "/dashboard/:user_name/posts/edit",
            element: <EditPost />,
          },
          {
            path: "/dashboard/:user_name/posts/new",
            element: <NewPost />,
          },
        ]
      },
      {
        path: "/dashboard/:user_name/projects",
        element: <DashboardProjects />,
        children: [
          {
            path: "/dashboard/:user_name/projects/edit",
            element: <EditProject />,
          },
          {
            path: "/dashboard/:user_name/projects/new",
            element: <NewProject />,
          },
        ]
      },
      {
        path: "/dashboard/:user_name/bio",
        element: <Bio />,
        children: [
          {
            path: "/dashboard/:user_name/bio/edit",
            element: <EditBio />,
          },
        ]
      },
      {
        path: "/dashboard/:user_name/drafts/project",
        element: <DraftProject />,
      },
      {
        path: "/dashboard/:user_name/drafts/post",
        element: <DraftPost />,
      },
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
