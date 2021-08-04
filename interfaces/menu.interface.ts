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