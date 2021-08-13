import { GetStaticPropsContext, GetStaticProps, GetStaticPaths } from 'next';
import { withLayout } from '../../layout/Layout';
import axios from 'axios';
import styles from '../styles/Home.module.css';
import { IMenuItems } from '../../interfaces/menu.interface';
import { ProductModel } from '../../interfaces/product.interface';
import { ParsedUrlQuery } from 'node:querystring';
import { TopPageModel } from '../../interfaces/toppage.interface';

const firstCategory = 0;


function Course({ menu,page,products }: ICourse): JSX.Element {
    return (
        <>
    {products.length}
        </>
    );
}

export default withLayout(Course);

export const getStaticPaths: GetStaticPaths=async()=>{
    const { data: menu } = await axios.post<IMenuItems[]>( 'https://courses-top.ru/api/top-page/find', {
        firstCategory
    });
    return {
        paths:menu.flatMap(m=>m.pages.map(page =>'/courses/'+page.alias)),
        fallback:true,
    };
};

export const getStaticProps: GetStaticProps<ICourse> = async ({ params }: GetStaticPropsContext<ParsedUrlQuery>) => {
    if (!params) {
        return {
            notFound: true
        };
    }
    const { data: menu } = await axios.post<IMenuItems[]>( 'https://courses-top.ru/api/top-page/find', {
        firstCategory
    });
    const { data: page } = await axios.get<TopPageModel>('https://courses-top.ru/api/top-page/byAlias/' + params.alias,
    );
    const { data: products } = await axios.post<ProductModel[]>('https://courses-top.ru/api/product/find',{
        category:page.category,
        limit:10
    }
    );

    return {
        props: {
            menu,
            firstCategory,
            page,
            products
        },

    };

};

interface ICourse extends Record<string, unknown> {
    menu: IMenuItems[];
    firstCategory: number;
    page: TopPageModel;
    products: ProductModel[];
}

