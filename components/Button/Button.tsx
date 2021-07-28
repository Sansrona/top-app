import { IButton } from "./Button.props";
import styles from './Button.module.css'
import cn from 'classnames';

export const Button = ({children,appearence,className, ...props}:IButton): JSX.Element => {
    return (
        <button className={cn(styles.button,className, {
            [styles.primary]:appearence==='primary',
            [styles.ghost]:appearence==='ghost',
        })} {...props}>{children}</button>
    )
};