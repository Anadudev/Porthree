import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
// import App from './App';
import Home from './pages/Home';
import About from './pages/About';
import UserAbout from './pages/UserAbout';
import Error from './pages/Error';
import Portfolios from './pages/Portfolios';
import Portfolio from './pages/Portfolio';
import Posts from './pages/Posts';
import Post from './pages/Post';
import Projects from './pages/Projects';
import Project from './pages/Project';
import Login from './pages/Login';
import Signup from './pages/Signup';
import PasswordReset from './pages/PasswordReset';
import Dashboard from './pages/Dashboard';
import Logout from './components/Dashboard/Logout.jsx';
import './index.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

/* TODO: handle unique url path */
/* TODO: handle unique url path */
/* TODO: handle unique url path */
/* TODO: handle unique url path */
/* TODO: handle unique url path */
/* TODO: handle unique url path */
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
    loader: async ({ params }) => ( fetch(`http://127.0.0.1:8000/api/user/${params.username}`)),
  },
  {
    path: "/:username/posts",
    element: <Posts />,
    loader: async ({params}) => (await fetch(`http://127.0.0.1:8000/api/user/${params.username}`)),
  },
  {
    path: "/:username/about",
    element: <UserAbout />,
  },
  {
    path: "/:username/posts/:slug",
    element: <Post />,
    loader: async ({ params }) => {
      const userPath = await fetch(`http://127.0.0.1:8000/api/user/${params.username}`)
      const slugPath = await fetch(`http://127.0.0.1:8000/api/posts/?slug=${params.slug}`)
      const user = await userPath.json();
      const slug = await slugPath.json();

      // console.log(slug.results[0].user === user.id)
      return slug.results[0].user === user.id ? slug : null
    },
  },
  {
    path: "/:username/projects",
    element: <Projects />,
    loader: async ({params}) => (await fetch(`http://127.0.0.1:8000/api/user/${params.username}`)),
  },
  {
    path: "/:username/projects/:slug",
    element: <Project />,
    loader: async ({ params }) => {
      const userPath = await fetch(`http://127.0.0.1:8000/api/user/${params.username}`)
      const slugPath = await fetch(`http://127.0.0.1:8000/api/projects/?slug=${params.slug}`)
      const user = await userPath.json();
      const slug = await slugPath.json();

      // console.log(slug.results[0].user === user.id)
      return slug.results[0].user === user.id ? slug : null
    },
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
