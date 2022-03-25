import { BottomNavigation, BottomNavigationAction } from "@material-ui/core";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import React, { FunctionComponent, useState } from "react";
import { useNavigate } from "react-router";

import { MenuWrapper } from "./Menu.sc";

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
                style={{
                    position: "fixed",
                    bottom: 0,
                    right: 0,
                    left: 0,
                    height: "100px",
                    background: "#191A1C",
                    borderTop: "1px solid #292929",
                    justifyContent: "space-evenly",
                    fontSize: "30px",
                    marginLeft: "auto",
                    marginRight: "auto",
                    maxWidth: "900px",
                    zIndex: "100",
                }}
                showLabels
            >
                <BottomNavigationAction
                    onClick={() => {
                        navigate("/");
                    }}
                    label="Home"
                    icon={<HomeOutlinedIcon fontSize="large" />}
                ></BottomNavigationAction>
                <BottomNavigationAction
                    onClick={() => {
                        navigate("/poll");
                    }}
                    label="Add"
                    icon={<AddCircleOutlineOutlinedIcon fontSize="large" />}
                ></BottomNavigationAction>
                <BottomNavigationAction
                    onClick={() => {
                        navigate("/");
                    }}
                    label="Account"
                    icon={<AccountCircleOutlinedIcon fontSize="large" />}
                ></BottomNavigationAction>
            </BottomNavigation>
        </MenuWrapper>
    );
};

export default BottomNav;
