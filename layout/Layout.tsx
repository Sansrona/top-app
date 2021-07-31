import { ILayout } from "./Layout.props";
import cn from 'classnames';
import styles from './Layout.module.css';
import React, { FunctionComponent } from "react";
import { Header } from "./Header/Header";
import { Sidebar } from "./Sidebar/Sidebar";
import { Footer } from "./Footer/Footer";

const Layout = ({ children }: ILayout): JSX.Element => {
    return (
        <div className={styles.wrapper}>
            <Header className={styles.header}/>
            <Sidebar className={styles.sidebar} />
            <div className={styles.body}>{children}</div>
            <Footer className={styles.footer}/>
        </div>
    );
};


export const withLayout = <T extends Record<string, unknown>>(Component: FunctionComponent<T>) => {
    return function (props: T): JSX.Element {
        return (
            <Layout>
                <Component {...props} />
            </Layout>
        )
    };
}