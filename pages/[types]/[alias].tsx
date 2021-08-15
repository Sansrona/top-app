import { GetStaticPropsContext, GetStaticProps, GetStaticPaths } from 'next';
import { withLayout } from '../../layout/Layout';
import axios from 'axios';
import { IMenuItems } from '../../interfaces/menu.interface';
import { ProductModel } from '../../interfaces/product.interface';
import { ParsedUrlQuery } from 'node:querystring';
import { TopPageLevel, TopPageModel } from '../../interfaces/toppage.interface';
import { firstLevelCategory } from '../../helpers/helpers';


function Course({ menu, page, products }: ICourse): JSX.Element {
    return (
        <>
        </>
    );
}

export default withLayout(Course);

export const getStaticPaths: GetStaticPaths = async () => {
    let paths: string[] = [];
    for (const m of firstLevelCategory) {
        const { data: menu } = await axios.post<IMenuItems[]>('https://courses-top.ru/api/top-page/find', {
            firstCategory: m.id
        });
        paths = paths.concat(menu.flatMap(s => s.pages.map(page => `/${m.route}/${page.alias}`)));
    }
    return {
        paths,
        fallback: true,
    };
};

export const getStaticProps: GetStaticProps<ICourse> = async ({ params }: GetStaticPropsContext<ParsedUrlQuery>) => {
    if (!params) {
        return {
            notFound: true
        };
    }

    const firstCategoryItem = firstLevelCategory.find(m => m.route === params.type);
    if (!firstCategoryItem) {
        return {
            notFound: true
        };
    }

    try {
        const { data: menu } = await axios.post<IMenuItems[]>('https://courses-top.ru/api/top-page/find', {
            firstCategory: firstCategoryItem.id
        });
        if (menu.length === 0) {
            return {
                notFound: true
            };
        }
        const { data: page } = await axios.get<TopPageModel>('https://courses-top.ru/api/top-page/byAlias/' + params.alias,
        );
        const { data: products } = await axios.post<ProductModel[]>('https://courses-top.ru/api/product/find', {
            category: page.category,
            limit: 10
        }
        );
        return {
            props: {
                menu,
                firstCategory: firstCategoryItem.id,
                page,
                products
            },
    
        };
    } catch {
        return {
            notFound: true
        };
    }



};

interface ICourse extends Record<string, unknown> {
    menu: IMenuItems[];
    firstCategory: TopPageLevel;
    page: TopPageModel;
    products: ProductModel[];
}
