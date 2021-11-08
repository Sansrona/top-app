import { IButton } from "./Button.props";
import styles from './Button.module.css';
import cn from 'classnames';
import Arrow from './Arrow.svg';

export const Button = ({children,arrow='none',appearance,className, ...props}:IButton): JSX.Element => {
    return (
        <button className={cn(styles.button,className, {
            [styles.primary]:appearance =='primary',
            [styles.ghost]:appearance =='ghost',
        })} {...props}>
            {children}
            {arrow !== 'none' && <span className={cn(styles.arrow,{
                [styles.down]:arrow =='down'
            })}><Arrow/></span>}
        </button>
    );
};