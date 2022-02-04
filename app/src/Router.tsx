import PrivateRoute from "@components/CustomRoute/PrivateRoute";
import RedirectRoute from "@components/CustomRoute/RedirectRoute";
import Menu from "@components/Menu/Menu";
import Auth from "@pages/Auth/Auth";
import CreateDecision from "@pages/CreateDecision/CreateDecision";
import DecisionPage from "@pages/DecisionPage/DecisionPage";
import Join from "@pages/Join/Join";
import PollWithType from "@pages/PollWithType/PollWithType";
import Protected from "@pages/Protected/Protected";
import Result from "@pages/Result/Result";
import Welcome from "@pages/Welcome/Welcome";
import React from "react";
import { Routes } from "react-router";
import { BrowserRouter, Route } from "react-router-dom";

const Router = () => {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/poll/:type" element={<PollWithType />} />
                    <Route path="/poll" element={<CreateDecision />} />
                    <Route path="/auth" element={<Auth />} />
                    <Route path="/join" element={<RedirectRoute />}>
                        <Route path="/join" element={<Join />} />
                    </Route>
                    <Route path="/result/:pollId" element={<RedirectRoute />}>
                        <Route path="/result/:pollId" element={<Result />} />
                    </Route>
                    <Route path="/decision/:pollId" element={<DecisionPage />} />
                    <Route path="/" element={<Home />} />
                    <Route path="/protected" element={<PrivateRoute />}>
                        <Route path="/protected" element={<Protected />} />
                    </Route>
                </Routes>
                <Menu />
            </BrowserRouter>
        </>
    );
};

export default Router;
