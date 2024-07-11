import React, { useContext } from "react";
import {Routes, Route} from 'react-router-dom';
import { authRoutes, publicRoutes } from "../routes";
import Authorization from "../pages/Authorization";
import { Context } from "..";

const AppRouter = () => {
    const {user} = useContext(Context)
    return(
        <Routes>
            {user.isAuth && authRoutes.map(({ path, Component }) => 
                <Route key={path} path={path} element={<Component />} exact />
            )}
            {publicRoutes.map(({ path, Component }) => 
                <Route key={path} path={path} element={<Component />} exact/>
            )}
            <Route path="/login" element={<Authorization />} />
        </Routes>
    )
}

export default AppRouter;