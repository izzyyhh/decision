import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import React, { FunctionComponent, useState } from "react";
import { useNavigate } from "react-router";

import { BottomNavigation, BottomNavigationAction, MenuWrapper } from "./Menu.sc";

const BottomNav: FunctionComponent = () => {
    const navigate = useNavigate();
    const exceptions = ["auth"];
    const curr = window.location.href.replace(window.location.origin, "").split("/")[1];

    if (exceptions.includes(curr)) {
        return <></>;
    }

    const [value, setValue] = useState(0);
    return (
        <MenuWrapper>
            <BottomNavigation
                value={value}
                onChange={(event, newValue) => {
                    setValue(newValue);
                }}
                showLabels
            >
                <BottomNavigationAction
                    onClick={() => {
                        navigate("/");
                    }}
                    label="Home"
                    icon={<HomeOutlinedIcon fontSize="large" />}
                />
                <BottomNavigationAction
                    onClick={() => {
                        navigate("/poll");
                    }}
                    label="Add"
                    icon={<AddCircleOutlineOutlinedIcon fontSize="large" />}
                />
                <BottomNavigationAction
                    onClick={() => {
                        navigate("/account");
                    }}
                    label="Account"
                    icon={<HelpOutlineIcon fontSize="large" />}
                />
            </BottomNavigation>
        </MenuWrapper>
    );
};

export default BottomNav;
