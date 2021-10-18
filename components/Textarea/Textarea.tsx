import { TextareaProps } from "./Textarea.props";
import cn from 'classnames';
import styles from './Input.module.css';


export const Textarea = ({className ,...props}: TextareaProps): JSX.Element => {
    return (
        <textarea className={cn(className, styles.input)} />
    );
};