import { ILayout } from "./Layout.props";
import cn from 'classnames';
import styles from './Layout.module.css';
import React, { FunctionComponent, useState, KeyboardEvent, useRef } from "react";
import { Header } from "./Header/Header";
import { Sidebar } from "./Sidebar/Sidebar";
import { Footer } from "./Footer/Footer";
import {Up} from '../components/';
import {AppContextProvider,IAppContext} from '../context/app.context';

const Layout = ({ children }: ILayout): JSX.Element => {
    const [isSkipLinkDisplayed, setIsSkipLinkDisplayed] = useState<boolean>(false);
    const bodyRef = useRef<HTMLDivElement>(null);

    const skipLinkFunction =(key: KeyboardEvent)=>{
        if(key.code == 'Space'||key.code == 'Enter'){
            key.preventDefault();
            bodyRef.current?.focus();
        }
        setIsSkipLinkDisplayed(false);
    }
    return (
        <div className={styles.wrapper}>
            <a 
            tabIndex={1} 
            className={cn(styles.skipLink,{
                [styles.displayed]: isSkipLinkDisplayed,
            })}
            onFocus={()=> setIsSkipLinkDisplayed(true)}
            onKeyDown={skipLinkFunction}
            >Перейти к содержанию</a>
            <Header className={styles.header}/>
            <Sidebar className={styles.sidebar} />
            <div className={styles.body} ref={bodyRef} tabIndex={0}>{children}</div>
            <Footer className={styles.footer}/>
            <Up />
        </div>
    );
};


export const withLayout = <T extends Record<string, unknown> & IAppContext>(Component: FunctionComponent<T>) => {
    return function (props: T): JSX.Element {
        return (
            <AppContextProvider menu={props.menu} firstCategory={props.firstCategory}>
            <Layout>
                <Component {...props} />
            </Layout>
            </AppContextProvider>
        );
    };
};