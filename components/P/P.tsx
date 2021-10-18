import { IP } from "./P.props";
import cn from 'classnames';
import styles from './P.module.css';


export const P = ({ children='medium', font, ...props }: IP): JSX.Element => {
    return <p className={cn({
        [styles.small]: font === '14',
        [styles.medium]: font === '16',
        [styles.large]: font === '18',
    })} {...props}> { children }</p >;
};