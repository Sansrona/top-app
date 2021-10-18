import { ISort, SortEnum } from "./Sort.props";
import cn from 'classnames';
import styles from './Sort.module.css';
import SortIcon from './sort.svg';


export const Sort = ({ sort, setSort, className ,...props }: ISort): JSX.Element => {


    return (
        <div className={cn(styles.sort, className)}>
            <span 
            onClick={()=> setSort(SortEnum.Rating)}
            className={cn({
                [styles.active]: sort == SortEnum.Rating
            })}
            >
                <SortIcon className={styles.sortIcon} /> По рейтингу
            </span>
            <span 
            onClick={()=> setSort(SortEnum.Price)}
            className={cn({
                [styles.active]: sort == SortEnum.Price
            })}
            >
                <SortIcon className={styles.sortIcon} /> По цене
            </span>
        </div>
    );
};