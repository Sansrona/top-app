import { useEffect, useState, KeyboardEvent, ForwardedRef } from 'react';
import { IRating } from "./Rating.props";
import cn from 'classnames';
import Star from './star.svg';
import styles from './Rating.module.css';


export const Rating = ({ isEditable = false, rating, setRating, ...props }: IRating, ref: ForwardedRef<HTMLDivElement>): JSX.Element => {
    const [ratingArray, setRatingArray] = useState<JSX.Element[]>(new Array(5).fill(<></>));

    useEffect(() => {
        construct(rating);
    }, [rating]);

    const construct = (currentRating: number,) => {
        const updatedArray = ratingArray.map((r, i: number) =>
            <span className={cn(styles.star, { [styles.filled]: i < currentRating })}
            onMouseEnter={() => changeDisplay(i + 1)}
            onMouseLeave={() => changeDisplay(rating)}
            onClick={() =>onClick(i+1)}
            >
            <Star tabIndex={isEditable?0:-1}
            onKeyDown={(e:KeyboardEvent<SVGAElement>) =>onKeyDown(i+1,e)}/>
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

    const onKeyDown = (i: number, e: KeyboardEvent<SVGAElement>) => {
        if (e.code !== "Space" || !setRating) {
            return;
        }
        setRating(i);
    };

    return <div {...props} ref={ref}>
        {ratingArray.map((r: JSX.Element, i: number) => <span key={i}>{r}</span>)}
    </div>;
};