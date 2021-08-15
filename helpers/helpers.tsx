
import BooksIcon from './icons/books.svg';
import ServicesIcon from './icons/services.svg';
import ProductsIcon from './icons/products.svg';
import CoursesIcon from './icons/courses.svg';
import { IfirstLevelCategory } from '../interfaces/menu.interface';
import { TopPageLevel } from '../interfaces/toppage.interface';

export  const firstLevelCategory: IfirstLevelCategory[] = [
    { route: 'courses', name: 'Курсы', icon: <CoursesIcon />, id: TopPageLevel.Courses },
    { route: 'service', name: 'Сервисы', icon: <ServicesIcon />, id: TopPageLevel.Services },
    { route: 'books', name: 'Книги', icon: <BooksIcon />, id: TopPageLevel.Books },
    { route: 'products', name: 'Товары', icon: <ProductsIcon />, id: TopPageLevel.Products }
];