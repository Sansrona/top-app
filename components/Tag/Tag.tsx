import { ITag } from "./Tag.props";
import cn from 'classnames';
import styles from './Tag.module.css';


export const Tag = ({ children, size='s', className, href, color='ghost', ...props }: ITag): JSX.Element => {
    return <div className={cn(styles.tag,className,{
        [styles.small]: size === 's',
        [styles.medium]: size === 'm',
        [styles.gray]: color === 'gray',
        [styles.primary]: color === 'primary',
        [styles.red]: color === 'red',
        [styles.green]: color === 'green',
        [styles.ghost]: color === 'ghost',
    })} {...props}>
        {href ? <a href={href}> {children}</a> : <> {children}</>}
    </div >;
};