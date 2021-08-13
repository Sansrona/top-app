import React, { PropsWithChildren } from "react";
import { createContext, ReactNode } from "react";
import {IMenuItems} from '../interfaces/menu.interface';
import {TopPageLevel} from '../interfaces/toppage.interface';


export interface IAppContext {
    menu: IMenuItems[],
    firstCategory: TopPageLevel,
    setMenu?: (newMenu:IMenuItems[])=> void
}

export const AppContext = createContext<IAppContext>({menu:[],firstCategory: TopPageLevel.Courses});

export const AppContextProvider = ({menu,firstCategory,children}:PropsWithChildren<IAppContext>): JSX.Element=>{
    const [menuState, setMenuState] = React.useState<IMenuItems[]>(menu);

    const setMenu = (newMenu:IMenuItems[])=>{
        setMenuState(newMenu);
    };

    return (
    <AppContext.Provider value={{menu:menuState, firstCategory,setMenu}}>
    {children}
    </AppContext.Provider>
    );
};