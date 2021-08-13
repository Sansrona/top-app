import styles from './Menu.module.css';
import React  from 'react';
import cn from "classnames";
import {AppContext} from '../../context/app.context';
import BooksIcon from './icons/books.svg';
import ServicesIcon from './icons/services.svg';
import ProductsIcon from './icons/products.svg';
import CoursesIcon from './icons/courses.svg';
import { IfirstLevelCategory } from '../../interfaces/menu.interface';
import { TopPageLevel } from '../../interfaces/toppage.interface';

const firstLevelCategory:IfirstLevelCategory[] = [
    {route: 'courses',name: 'Courses',icon:<CoursesIcon/>, id:TopPageLevel.Courses},
    {route: 'service',name: 'Service',icon:<ServicesIcon/>, id:TopPageLevel.Services},
    {route: 'books',name: 'Books',icon:<BooksIcon/>, id:TopPageLevel.Books},
    {route: 'products',name: 'Products',icon:<ProductsIcon/>, id:TopPageLevel.Products}
]


export const Menu = ({...props }): JSX.Element => {
    const { menu, firstCategory, setMenu } = React.useContext(AppContext);


    
    return (
        <div className={cn(styles.menu)}  {...props}>
            <ul>
                {menu.map(m => <li key={m._id.secondCategory}>{m._id.secondCategory}</li>)}
            </ul>
            </div>
            );
};