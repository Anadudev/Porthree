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
import Educations from './pages/Educations.jsx';
import Experiences from './pages/Experiences.jsx';
import './index.css';
import { GetRelation } from './data/GetUser.jsx';
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
    errorElement: <Error />,
  },
  {
    path: "/portfolios",
    element: <Portfolios />,
    errorElement: <Error />,
  },
  {
    path: "/:username",
    element: <Portfolio />,
    errorElement: <Error />,
    loader: async ({ params }) => {
      try {
        return await fetch(`http://127.0.0.1:8000/api/user/${params.username}`)
      } catch (error) {
        return null
      }
    },
  },
  {
    path: "/:username/posts",
    element: <Posts />,
    errorElement: <Error />,
    loader: async ({ params }) => {
      try {
        const user = await fetch(`http://127.0.0.1:8000/api/user/${params.username}`)
        return user.status != 200? null : user
      } catch (error) {
        return null
      }

    },
  },
  {
    path: "/:username/about",
    element: <UserAbout />,
  },
  {
    path: "/:username/posts/:slug",
    element: <Post />,
    errorElement: <Error />,
    loader: async ({ params }) => {
      try {
        const userPath = await fetch(`http://127.0.0.1:8000/api/user/${params.username}`)
        const slugPath = await fetch(`http://127.0.0.1:8000/api/posts/?slug=${params.slug}`)
        const user = await userPath.json();
        const slug = await slugPath.json();
        const relate = await GetRelation(slug.results[0].user)
        return relate.id === user.id ? slug : null
      } catch (error) {
        return null
      }
    },
  },
  {
    path: "/:username/projects",
    element: <Projects />,
    errorElement: <Error />,
    loader: async ({ params }) => {
      try {
        return await fetch(`http://127.0.0.1:8000/api/user/${params.username}`)
      } catch (error) {
        return null
      }
    },
  },
  {
    path: "/:username/educations",
    element: <Educations />,
    errorElement: <Error />,
    loader: async ({ params }) => {
      try {
        return await fetch(`http://127.0.0.1:8000/api/user/${params.username}`)
      } catch (error) {
        return null
      }
    },
  },
  {
    path: "/:username/experiences",
    element: <Experiences />,
    errorElement: <Error />,
    loader: async ({ params }) => {
      try {
        return await fetch(`http://127.0.0.1:8000/api/user/${params.username}`)
      } catch (error) {
        return null
      }
    },
  },
  {
    path: "/:username/projects/:slug",
    element: <Project />,
    errorElement: <Error />,
    loader: async ({ params }) => {
      try {
        const userPath = await fetch(`http://127.0.0.1:8000/api/user/${params.username}`);
        const slugPath = await fetch(`http://127.0.0.1:8000/api/projects/?slug=${params.slug}`);
        const user = await userPath.json();
        const slug = await slugPath.json();
        const relate = await GetRelation(slug.results[0].user)
        return relate.id === user.id ? slug : null;
      } catch (error) {
        return null;
      }
    },
  },
  {
    path: "/signup",
    element: <Signup />,
    errorElement: <Error />,
  },
  {
    path: "/logout",
    element: <Logout />,
    errorElement: <Error />,
  },
  {
    path: "/password_reset",
    element: <PasswordReset />,
    errorElement: <Error />,
  },
  {
    path: "/login",
    element: <Login />,
    errorElement: <Error />,
  },
  {
    path: "/dashboard/:username",
    element: <Dashboard />,
    errorElement: <Error />,
    loader: async ({ params }) => {
      const user = JSON.parse(localStorage.getItem("user"));
      try {
        if (params.username === user.username) { return await fetch(`http://127.0.0.1:8000/api/users/?username=${params.username}`) }
        return null;
      } catch (error) {
        return null;
      }
      // return { loading: true };
    },
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
