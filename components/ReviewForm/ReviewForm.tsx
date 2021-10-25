import { ReviewFormProps } from "./ReviewForm.props";
import cn from 'classnames';
import styles from './ReviewForm.module.css';
import React from "react";
import { Button, Input, Rating, Textarea } from "..";4
import CloseIcon from './close.svg';

export const ReviewForm = ({ className, productId, ...props }: ReviewFormProps): JSX.Element => {
    return (
        <>
        <div className={cn(styles.reviewForm, className)} {...props}>
            <Input placeholder='Имя' />
            <Input className={styles.title} placeholder='Заголовок отзыва'/>
            <div className={styles.rating}>
                <span>Оценка:</span>
                <Rating rating={0}/>
            </div>
            <Textarea className={styles.placeholder} placeholder='Текст отзыва'/>
            <div className={styles.submit}>
                <Button appearance='primary'>Отправить</Button>
                <span className={styles.info}>* Перед публикацией отзыв пройдет предварительную модерацию и проверку</span>
            </div>
        </div>
        <div className={styles.success}>
            <div className={styles.successTitle}>Ваш отзыв отправлен</div>
            <div className={styles.success}>Спасибо, ваш отзыв будет опубликован после проверки</div>
            <CloseIcon className={styles.closeIcon} />
        </div>
        </>
    );
};