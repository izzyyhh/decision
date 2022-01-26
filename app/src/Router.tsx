import Home from "@pages/Home/Home";
import React from "react";
import { Route, Routes } from "react-router";
import { BrowserRouter } from "react-router-dom";

// const Home = lazy(() => import("@pages/Home/Home"));

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={Home} />
            </Routes>
        </BrowserRouter>
    );
};

export default Router;
