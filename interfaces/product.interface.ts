export interface ProductCharacteristic {
    value: string;
    name:string;
}

export interface ReviewModel {
    _id:string;
    name:string;
    title:string;
    description:string;
    rating:number;
    createdAt : Date;
}

export interface ProductModel {
    _id:string;
    category:string;
    title:string;
    tags:string[];
    link:string;
    price:number;
    credit:number;
    oldPrice:number;
    description:string;
    characteristic:ProductCharacteristic;
    createdAt:Date;
    updatedAt:Date;
    _v:number;
    image:string;
    initialRating:number;
    reviews:ReviewModel[];
    reviewCount:number;
    reviewAvg?:number;
    advantages:string;
}