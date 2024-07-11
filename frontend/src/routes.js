import { LOGIN_ROUTE, MAIN_ROUTE, PROFILE_ROUTE, REGISTRATION_ROUTE, USERCARD_ROUTE } from "./utils/consts";
import Main from "./pages/MainPage";
import UserCard from "./pages/UserCard";
import Authorization from "./pages/Authorization";
import UserProfile from "./pages/Profile";

export const authRoutes = [
    { path: LOGIN_ROUTE, Component: Authorization },
    { path: REGISTRATION_ROUTE, Component: Authorization },
    { path: MAIN_ROUTE, Component: Main },
    { path: USERCARD_ROUTE + '/:id', Component: UserCard },
    { path: PROFILE_ROUTE + '/:id', Component: UserProfile}
]

export const publicRoutes = [
    { path: LOGIN_ROUTE, Component: Authorization },
    { path: REGISTRATION_ROUTE, Component: Authorization },
    { path: MAIN_ROUTE, Component: Main }
]