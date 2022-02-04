import HomeIcon from "@mui/icons-material/Home";
import React, { FunctionComponent } from "react";
import { useNavigate } from "react-router";

import { MenuWrapper } from "./Menu.sc";

const Menu: FunctionComponent = () => {
    const navigate = useNavigate();
    const exceptions = ["auth", ""];
    const curr = window.location.href.replace(window.location.origin, "").split("/")[1];

    const handleClick = () => {
        navigate("/");
    };

    if (exceptions.includes(curr)) {
        return <></>;
    }

    return (
        <MenuWrapper>
            <HomeIcon onClick={handleClick} color={"primary"} />
        </MenuWrapper>
    );
};

export default Menu;
