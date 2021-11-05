import { useEffect, useState, KeyboardEvent, ForwardedRef, forwardRef, useRef } from 'react';
import { IRating } from "./Rating.props";
import cn from 'classnames';
import Star from './star.svg';
import styles from './Rating.module.css';


export const Rating = forwardRef(({ isEditable = false, error,tabIndex, rating, setRating, ...props }: IRating, ref: ForwardedRef<HTMLDivElement>): JSX.Element => {
    const [ratingArray, setRatingArray] = useState<JSX.Element[]>(new Array(5).fill(<></>));
    const ratingRef = useRef<(HTMLSpanElement|null)[]>([]);

    useEffect(() => {
        construct(rating);
    }, [rating,tabIndex]);

    const computeFocus=(r:number, i:number):number=> {
        if(!isEditable){
            return -1;
        }
        if(!rating && i ==0){
            return tabIndex??0;
        }
        if(r == i+1){
            return tabIndex??0;
        }
        return -1;
    };

    const construct = (currentRating: number,) => {
        const updatedArray = ratingArray.map((r, i: number) =>
            <span className={cn(styles.star, { [styles.filled]: i < currentRating })}
            onMouseEnter={() => changeDisplay(i + 1)}
            onMouseLeave={() => changeDisplay(rating)}
            onClick={() =>onClick(i+1)}
            tabIndex={computeFocus(rating,i)}
            onKeyDown={handleKey}
            ref={e=>ratingRef.current?.push(e)}
            >
            <Star />
            </span>
        );
        setRatingArray(updatedArray);
    };

    const changeDisplay = (i: number) => {
        if (!isEditable) {
            return;
        }
        construct(i);
    };

    const onClick = (i: number) => {
        if (!isEditable || !setRating) {
            return;
        }
        setRating(i);
    };

    const handleKey = (e: KeyboardEvent) => {
       if(!isEditable || !setRating) {
           return;
        }
        if(e.code == 'ArrowRight'||e.code == 'ArrowUp'){
           if(!rating){
               setRating(1);
           }else{
            e.preventDefault();
            setRating(rating<5?rating+1:5);
           }
           ratingRef.current[rating]?.focus();
        }
        if(e.code == 'ArrowLeft'||e.code == 'ArrowDown'){
            e.preventDefault();
            setRating(rating>1?rating-1:1);
            ratingRef.current[rating-2]?.focus();
    }
    };

    return (
        <div {...props} ref={ref} className={styles.ratingWrapper}>
        <div className={error && styles.error} >
        {ratingArray.map((r: JSX.Element, i: number) => <span key={i}>{r}</span>)}
        </div>
        {error && <span className={styles.errorMessage}>{error.message}</span>}
        </div>
    );
});