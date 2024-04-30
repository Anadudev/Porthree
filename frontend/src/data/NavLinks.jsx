

import { GetItem } from "./GetUser";
import Logout from "../components/Dashboard/Logout";
import PersonIcon from '@mui/icons-material/Person';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import WorkspacesIcon from '@mui/icons-material/Workspaces';
import WorkHistoryIcon from '@mui/icons-material/WorkHistory';
import ChromeReaderModeIcon from '@mui/icons-material/ChromeReaderMode';
import ConnectWithoutContactIcon from '@mui/icons-material/ConnectWithoutContact';
import GroupIcon from '@mui/icons-material/Group';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';

export const NavLinks = [
    {
        id: 1,
        title: "Home",
        icon: <HomeIcon />,
        url: "/",
    },
    {
        id: 2,
        title: "Portfolios",
        icon: <GroupIcon />,
        url: "/portfolios",
    },
    {
        id: 3,
        title: "Posts",
        icon: <ChromeReaderModeIcon />,
        url: "/posts",
    },
    {
        id: 4,
        title: "Projects",
        icon: <WorkHistoryIcon />,
        url: "/projects",
    },
    {
        id: 5,
        title: "About",
        icon: <InfoIcon />,
        url: "/#about",
    },
];


export const UserNavLinks = (data) => (
    [
        {
            id: 1,
            title: data?.username || "#",
            icon: <PersonIcon />,
            url: `/${data?.username}` || "#",
        },
        {
            id: 2,
            title: "About",
            icon: <InfoIcon />,
            url: `/${data?.username}#about` || "#",
        },
        {
            id: 3,
            title: "Skills",
            icon: <WorkspacesIcon />,
            url: `/${data?.username}#skills` || "#",
        },
        {
            id: 4,
            title: "Projects",
            icon: <WorkHistoryIcon />,
            url: `/${data?.username}#projects` || "#",
        },
        {
            id: 6,
            title: "Posts",
            icon: <ChromeReaderModeIcon />,
            url: `/${data?.username}#posts` || "#",
        },
        {
            id: 6,
            title: "Contact",
            icon: <ConnectWithoutContactIcon />,
            url: `/${data?.username}#contact` || "#",
        },
        {
            id: 7,
            title: "Portfolios",
            icon: <GroupIcon />,
            url: `/portfolios` || "#",
        },
    ]);


// const authUser = await GetItem('users', id);

export const userTools = () => {
const authUser = JSON.parse(localStorage.getItem("user"));
    console.log(authUser);
    return [
        {
            title: "",
            url: '',
            user: authUser,
        },
        {
            title: "My portfolio",
            url: `/${authUser?.username}` || "#",
        },
        {
            title: "My Account",
            url: `/dashboard/${authUser?.username}` || "#",
        },
        {
            title: "My Dashboard",
            url: `/dashboard/${authUser?.username}` || "#",
        },
        {
            item: <Logout />,
        },
    ]};
