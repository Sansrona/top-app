export enum TopPageLevel{
    Courses,
    Services,
    Books,
    Products
}

export interface TopPageAdvantage {
    _id:string;
    title:string;
    description:string;
}

export interface HhData {
    _id:string;
    count:number;
    juniorSalary:number;
    middleSalary:number;
    seniorSalary:number;
    updatedAt: Date;
}

export interface TopPageModel {
    tags: string[];
    alias: string;
    title: string;
    _id: string;
    category:string;
    seoText?: string;
    metaTitle: string;
    tagsTitle: string;
    metaDescription: string
    firstCategory:TopPageLevel;
    advantages?: TopPageAdvantage[];
    createdAt : Date;
    updatedAt : Date;
    _v:number;
    hh?:HhData;
}