import { DetailedHTMLProps, HTMLAttributes } from "react";
import { TopPageLevel, TopPageModel } from '../../interfaces/toppage.interface';
import { ProductModel } from '../../interfaces/product.interface';

export interface ITopPageComponent extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>{
    firstCategory: TopPageLevel;
    products: ProductModel[];
    page: TopPageModel;
}  