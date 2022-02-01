import Auth from "@pages/Auth/Auth";
import Home from "@pages/Home/Home";
import React from "react";
import { Routes } from "react-router";
import { BrowserRouter, Route } from "react-router-dom";

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
<<<<<<< HEAD
                <Route path="/auth" element={<Auth />} />
                <Route path="/" element={<Home />} />
=======
                <Route path="/" element={<Home/>} />
>>>>>>> add initial global styles
            </Routes>
        </BrowserRouter>
    );
};

export default Router;
