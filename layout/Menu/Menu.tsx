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
import Link from 'next/link';
import { useRouter } from 'next/router';

const firstLevelCategory: IfirstLevelCategory[] = [
    { route: 'courses', name: 'Курсы', icon: <CoursesIcon />, id: TopPageLevel.Courses },
    { route: 'service', name: 'Сервисы', icon: <ServicesIcon />, id: TopPageLevel.Services },
    { route: 'books', name: 'Книни', icon: <BooksIcon />, id: TopPageLevel.Books },
    { route: 'products', name: 'Товары', icon: <ProductsIcon />, id: TopPageLevel.Products }
];


export const Menu = (): JSX.Element => {
    const { menu, firstCategory, setMenu } = React.useContext(AppContext);
    const router = useRouter();

    const onChangeSecondLevel = (secondCategory: string) => {
        setMenu && setMenu(menu.map(m=>{
            if(m._id.secondCategory===secondCategory){
                m.isOpened=!m.isOpened;
            }
            return m;
        }));
    };    

    const buildFirstLevel = () => {
        return (
            <div >
                {firstLevelCategory.map(m => (
                    <div key={`${m.route}`}>
                        <Link href={`/${m.route}`}>
                            <a>
                                <div className={cn(styles.firstLevelMenu, {
                                    [styles.firstLevelMenuActive]: m.id === firstCategory
                                })}>
                                    {m.icon}
                                    <span>{m.name}</span>
                                </div>
                            </a></Link>
                        {m.id === firstCategory && buildSecondLevel(m)}
                    </div>)
                )}
            </div>
        );
    };

    const buildSecondLevel = (menuItem: IfirstLevelCategory) => {
        return (
            <div className={styles.secondLevel}>
                {
                    menu.map(m => {
                        if(m.pages.map(p=>p.alias).includes(router.asPath.split('/')[2])){
                            m.isOpened = true;
                        }
                        return (
                                <div key={m._id.secondCategory}>
                                    <div className={cn(styles.secondLevelMenu)} onClick={()=>onChangeSecondLevel(m._id.secondCategory)}>
                                        {m._id.secondCategory}
                                    </div>
                                    <div className={cn(styles.secondLevelBlock, {
                                        [styles.secondLevelBlockActive]: m.isOpened
                                    })}>
                                        {buildThirdLevel(m.pages, menuItem.route)}
                                    </div>
                                </div>
                            )
                    }
                    )
                }
            </div>
        );
    };


    const buildThirdLevel = (pages: PageItem[], route: string) => {
        return (
            <>
                {pages.map(p => (
                    <Link href={`/${route}/${p.alias}`}>
                        <a className={cn(styles.thirdLevelMenu, {
                            [styles.thirdLevelMenuActive]: `/${route}/${p.alias}` === router.asPath
                        })}
                        >{p.category}</a></Link>
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