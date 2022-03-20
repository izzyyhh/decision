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

export enum AppRoutes {
    Root = "/",
    Poll = "/poll",
    PollByType = "/poll/:type",
    Auth = "/auth",
    JoinByPoll = "/join/:pollId",
    ResultByPoll = "/result/:pollId",
    DecisionByPoll = "/decision/:pollId",
    Protected = "/protected",
}

const Router = () => {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path={AppRoutes.PollByType} element={<PollWithType />} />
                    <Route path={AppRoutes.Poll} element={<CreateDecision />} />
                    <Route path={AppRoutes.Auth} element={<Auth />} />
                    <Route path={AppRoutes.JoinByPoll} element={<RedirectRoute />}>
                        <Route path={AppRoutes.JoinByPoll} element={<Join />} />
                    </Route>
                    <Route path={AppRoutes.ResultByPoll} element={<RedirectRoute />}>
                        <Route path={AppRoutes.ResultByPoll} element={<Result />} />
                    </Route>
                    <Route path={AppRoutes.DecisionByPoll} element={<DecisionPage />} />
                    <Route path={AppRoutes.Root} element={<PrivateRoute />}>
                        <Route path={AppRoutes.Root} element={<Welcome />} />
                    </Route>
                    <Route path={AppRoutes.Protected} element={<PrivateRoute />}>
                        <Route path={AppRoutes.Protected} element={<Protected />} />
                    </Route>
                </Routes>
                <Menu />
            </BrowserRouter>
        </>
    );
};

export default Router;
