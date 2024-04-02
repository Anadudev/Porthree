

import GetUser, { GetItem } from "./GetUser";
import Logout from "../components/Dashboard/Logout";


export const NavLinks = [
    {
        id: 1,
        title: "Home",
        url: "/",
    },
    {
        id: 2,
        title: "Portfolios",
        url: "/portfolios",
    },
    {
        id: 3,
        title: "About",
        url: "/about",
    },
];

export const UserNavLinks = (data) => (
    [
        {
            id: 1,
            title: data.username || "#",
            url: `/${data.username}` || "#",
        },
        {
            id: 2,
            title: "About",
            url: `/${data.username}#about` || "#",
        },
        {
            id: 3,
            title: "Skills",
            url: `/${data.username}#skills` || "#",
        },
        {
            id: 4,
            title: "Projects",
            url: `/${data.username}#projects` || "#",
        },
        {
            id: 6,
            title: "Posts",
            url: `/${data.username}#posts` || "#",
        },
        {
            id: 6,
            title: "Contact",
            url: `/${data.username}#contact` || "#",
        },
        {
            id: 7,
            title: "Portfolios",
            url: `/portfolios` || "#",
        },
    ]);


const id = JSON.parse(localStorage.getItem("user")).id;
const authUser = await GetItem('users', id);
// console.log(authUser)
export const userTools = () => (
    [
        {
            title: "",
            url: '',
            user: authUser,
        },
        {
            title: "My portfolio",
            url: `/${authUser.username}` || "#",
        },
        {
            title: "My Account",
            url: `/dashboard/${authUser.username}` || "#",
        },
        {
            title: "My Dashboard",
            url: `/dashboard/${authUser.username}` || "#",
        },
        {
            item: <Logout />,
        },
    ]);
