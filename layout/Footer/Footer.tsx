import { IFooter } from "./Footer.props";
import styles from './Footer.module.css';
import cn from "classnames";
import {format} from 'date-fns';


export const Footer = ({className, ...props }: IFooter): JSX.Element => {
    return (
        <div className={cn(className, styles.footer)}  {...props}>
            <div>OwlTop © 2020 - {format(new Date(),'yyyy')} Все права защищены</div>
            <a href="#" target="_blank">Пользовательское соглашение</a>
            <a href="#" target='_blank'>Политика конфиденциальности</a>
            
        </div>
    );
};