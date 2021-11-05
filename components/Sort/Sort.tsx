import { ISort, SortEnum } from "./Sort.props";
import cn from 'classnames';
import styles from './Sort.module.css';
import SortIcon from './sort.svg';


export const Sort = ({ sort, setSort, className ,...props }: ISort): JSX.Element => {
    const handleKey =(key:KeyboardEvent, sorting: SortEnum)=>{
        if(key.code == 'Space' || key.code == 'Enter'){
            setSort(sorting);
        }
    };

    return (
        <div className={cn(styles.sort, className)}>
            <div id='sort' className={styles.sortName}>Сортировка</div>
            <button 
            id='rating'
            onClick={()=> setSort(SortEnum.Rating)}
            className={cn({
                [styles.active]: sort == SortEnum.Rating
            })}
            aria-selected={sort == SortEnum.Rating}
            aria-labelledby='sort rating'
            >
                <SortIcon className={styles.sortIcon} /> По рейтингу
            </button>
            <button 
            id='price'
            onClick={()=> setSort(SortEnum.Price)}
            className={cn({
                [styles.active]: sort == SortEnum.Price
            })}
            aria-selected={sort == SortEnum.Price}
            aria-labelledby='sort price'
            >
                <SortIcon className={styles.sortIcon} /> По цене
            </button>
        </div>
    );
};