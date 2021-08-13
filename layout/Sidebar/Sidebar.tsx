import React from "react";
import { Menu } from "../Menu/Menu";
import { ISidebar } from "./Sidebar.props";


export const Sidebar = ({ ...props }: ISidebar): JSX.Element => {
    return <div {...props}>
        <Menu></Menu>
    </div>;
};