
import BooksIcon from './icons/books.svg';
import ServicesIcon from './icons/services.svg';
import ProductsIcon from './icons/products.svg';
import CoursesIcon from './icons/courses.svg';
import { IfirstLevelCategory } from '../interfaces/menu.interface';
import { TopPageLevel } from '../interfaces/toppage.interface';

export  const firstLevelCategory: IfirstLevelCategory[] = [
    { route: 'courses', name: 'Курсы', icon: <CoursesIcon />, id: TopPageLevel.Courses },
    { route: 'services', name: 'Сервисы', icon: <ServicesIcon />, id: TopPageLevel.Services },
    { route: 'books', name: 'Книги', icon: <BooksIcon />, id: TopPageLevel.Books },
    { route: 'products', name: 'Товары', icon: <ProductsIcon />, id: TopPageLevel.Products }
];

export const makeRub = (value:number):string => value.toString().replace(/\B(?=(\d{3})+(?!\d))/g,' ').concat(' ₽');

export const delvOfNumber = (num: number, titles: [string, string, string]):string => {
    const cases = [2,0,1,1,1,2];
    return titles[(num % 100 > 4 && num % 100 < 20) ? 2: cases[(num%10<5)?num :5]];
};