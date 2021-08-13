import styles from './Menu.module.css';
import React from 'react';
import cn from "classnames";
import { AppContext } from '../../context/app.context';
import BooksIcon from './icons/books.svg';
import ServicesIcon from './icons/services.svg';
import ProductsIcon from './icons/products.svg';
import CoursesIcon from './icons/courses.svg';
import { IfirstLevelCategory, PageItem } from '../../interfaces/menu.interface';
import { TopPageLevel } from '../../interfaces/toppage.interface';

const firstLevelCategory: IfirstLevelCategory[] = [
    { route: 'courses', name: 'Courses', icon: <CoursesIcon />, id: TopPageLevel.Courses },
    { route: 'service', name: 'Service', icon: <ServicesIcon />, id: TopPageLevel.Services },
    { route: 'books', name: 'Books', icon: <BooksIcon />, id: TopPageLevel.Books },
    { route: 'products', name: 'Products', icon: <ProductsIcon />, id: TopPageLevel.Products }
];


export const Menu = (): JSX.Element => {
    const { menu, firstCategory, setMenu } = React.useContext(AppContext);

    const buildFirstLevel = () => {
        return (
            <div>
                {firstLevelCategory.map(m => (
                    <div key={`${m.route}`}>
                        <a href={`/${m.route}`}>
                            <div className={cn(styles.firstLevelMenu, {
                                [styles.firstLevelMenuActive]: m.id === firstCategory
                            })}>
                                {m.icon}
                                <span>{m.name}</span>
                            </div>
                        </a>
                        {m.id === firstCategory && buildSecondLevel(m)}
                    </div>)
                )}
            </div>
        );
    };

    const buildSecondLevel = (menuItem:IfirstLevelCategory) => {
        return (
            <div>
                {
                    menu.map(m => (
                        <div key={m._id.secondCategory}>
                            <div  className={cn(styles.secondLevelMenu)}>
                            {m._id.secondCategory}
                        </div>
                        <div className={cn(styles.secondLevelBlock,{
                            [styles.secondLevelBlockActive]: m.isOpened
                        })}>
                            {buildThirdLevel(m.pages, menuItem.route)}
                        </div>
                        </div>
                    ))
                }
            </div>
        );
    };


    const buildThirdLevel = (pages:PageItem[],route:string) => {
        return (
            <>
                {pages.map(p=>(
                    <a href={`/${route}/${p.alias}`}>{p.category}</a>
                ))}
            </>
        );
    };

    return (
        <div className={cn(styles.menu)}>
            {buildFirstLevel()}
        </div>
    );
};