import { ILayout } from "./Layout.props";
import cn from 'classnames';
import styles from './Rating.module.css';
import React from "react";
import { Header } from "./Header/Header";
import { Sidebar } from "./Sidebar/Sidebar";
import { Footer } from "./Footer/Footer";

export const Layout = ({children}:ILayout): JSX.Element=> {
    return (<>
        <Header />
        <div>
            <Sidebar />
            <div>
                {children}
            </div>
        </div>
        <Footer />
        </>
    );
};