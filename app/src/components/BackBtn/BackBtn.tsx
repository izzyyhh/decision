import React, { FunctionComponent } from "react";
import { useNavigate } from "react-router-dom";

import { Back } from "./BackBtn.sc";

const BackBtn: FunctionComponent = () => {
    const navigate = useNavigate();
    return (
        <>
            <Back onClick={() => navigate(-1)} />
        </>
    );
};

export default BackBtn;
