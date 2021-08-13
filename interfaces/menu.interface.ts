import { TopPageLevel } from "./toppage.interface";

export interface PageItem{
    alias: string;
    title: string;
    _id: string;
    category:string;
}

export interface IMenuItems{
    _id:{
        secondCategory:string;
    };
    pages:PageItem[];
}

export interface IfirstLevelCategory{
    name:string;
    route:string;
    icon:JSX.Element;
    id:TopPageLevel;
}