export const Routes = [
    {
        home: {
            component: "App",
            route: "/",
        },
        about: {
            component: "About",
            route: "/about",
        },
        portfolios: {
            component: "Portfolios",
            route: "/portfolios",
        },

        portfolio: {
            component: "portfolio",
            route: "/:username",
        },
        posts: {
            component: "Posts",
            route: "/:username/posts",
        },
        post: {
            component: "Post",
            route: "/:username/posts/:slug",
        },
        projects: {
            component: "Projects",
            route: "/:username/projects",
        },
        project: {
            component: "Project",
            route: "/:username/projects/:slug",
        },

        login: {
            component: "Login",
            route: "/auth/login",
        },
        signup: {
            component: "Signup",
            route: "/auth/signup",
        },
        password_reset: {
            component: "PasswordReset",
            route: "/auth/password_reset",
        },
        // to be as defined in react routers docs
        error: {
            component: "Error",
            route: "/error/<int:error_code>",
        },
        // _______________-------__________
        dash_board: {
            component: "Dashboard",
            route: "/dash_board/:user_name",
            children: {
                profile: {
                    component: "Profile",
                    route: "/dash_board/:user_name/profile",
                    children: {
                        edit: {
                            component: "EditProfile",
                            route: "/dash_board/:user_name/profile/edit",
                        },
                    }
                },
                posts: {
                    component: "Posts",
                    route: "/dash_board/:user_name/posts",
                    children: {
                        new: {
                            component: "NewPost",
                            route: "/dash_board/:user_name/post/new",
                        },
                        draft: {
                            component: "DraftPost",
                            route: "/dash_board/:user_name/post/draft",
                        },
                        edit: {
                            component: "EditPost",
                            route: "/dash_board/:user_name/post/edit",
                        },
                    }
                },
                projects: {
                    component: "Projects",
                    route: "/dash_board/:user_name/projects",
                    children: {
                        new: {
                            component: "NewProject",
                            route: "/dash_board/:user_name/project/new",
                        },
                        draft: {
                            component: "DraftProject",
                            route: "/dash_board/:user_name/project/draft",
                        },
                        edit: {
                            component: "EditProject",
                            route: "/dash_board/:user_name/project/edit",
                        },
                    }
                },
                bio: {
                    component: "Bio",
                    route: "/dash_board/:user_name/bio",
                    children: {
                        edit: {
                            component: "EditBio",
                            route: "/dash_board/:user_name/bio/edit",
                        },
                    }
                }
            }
        },
    },
]
