import { ICard } from "./Card.props";
import cn from 'classnames';
import styles from './Card.module.css';


export const Card = ({ children, className,color='white', ...props }: ICard): JSX.Element => {
    return (
        <div className={cn(styles.card, className, {
            [styles.blue]: color === 'blue'
        })} {...props}>
            {children}
        </div>
    );
};