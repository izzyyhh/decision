import HomeIcon from "@mui/icons-material/Home";
import React, { FunctionComponent } from "react";
import { useNavigate } from "react-router";

import { MenuWrapper } from "./Menu.sc";

const Menu: FunctionComponent = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/");
    };

    return (
        <MenuWrapper>
            <HomeIcon onClick={handleClick} color={"primary"} />
        </MenuWrapper>
    );
};

export default Menu;
