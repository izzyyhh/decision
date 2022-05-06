import BottomNav from "@components/Menu/Menu";
import AccountPage from "@pages/Account/Account";
import CreateDecision from "@pages/CreateDecision/CreateDecision";
import DecisionPage from "@pages/DecisionPage/DecisionPage";
import Join from "@pages/Join/Join";
import Result from "@pages/Result/Result";
import Welcome from "@pages/Welcome/Welcome";
import React from "react";
import { Routes } from "react-router";
import { BrowserRouter, Route } from "react-router-dom";

export enum AppRoutes {
    Root = "/",
    Poll = "/poll",
    Auth = "/auth",
    JoinByPoll = "/join/:pollId",
    ResultByPoll = "/result/:pollId",
    DecisionByPoll = "/decision/:pollId",
    Protected = "/protected",
    Account = "/account",
}

const Router = () => {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path={AppRoutes.Poll} element={<CreateDecision />} />
                    <Route path={AppRoutes.JoinByPoll} element={<Join />} />
                    <Route path={AppRoutes.ResultByPoll} element={<Result />} />
                    <Route path={AppRoutes.DecisionByPoll} element={<DecisionPage />} />
                    <Route path={AppRoutes.Root} element={<Welcome />} />
                    <Route path={AppRoutes.Account} element={<AccountPage />} />
                </Routes>
                <BottomNav />
            </BrowserRouter>
        </>
    );
};

export default Router;
