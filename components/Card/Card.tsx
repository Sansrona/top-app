import { ICard } from "./Card.props";
import cn from 'classnames';
import styles from './Card.module.css';
import { ForwardedRef, forwardRef } from "react";


export const Card = forwardRef(({ children, className,color='white', ...props }: ICard, ref: ForwardedRef<HTMLDivElement>): JSX.Element => {
    return (
        <div className={cn(styles.card, className, {
            [styles.blue]: color === 'blue'
        })} ref={ref} {...props}>
            {children}
        </div>
    );
});