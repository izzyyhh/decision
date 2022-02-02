import PrivateRoute from "@components/CustomRoute/PrivateRoute";
import Auth from "@pages/Auth/Auth";
import CreateDecision from "@pages/CreateDecision/CreateDecision";
import Home from "@pages/Home/Home";
import Protected from "@pages/Protected/Protected";
import React from "react";
import { Routes } from "react-router";
import { BrowserRouter, Route } from "react-router-dom";

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/poll" element={<CreateDecision />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/" element={<Home />} />
                <Route path="/protected" element={<PrivateRoute />}>
                    <Route path="/protected" element={<Protected />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default Router;
