import { ReviewFormProps } from "./ReviewForm.props";
import cn from 'classnames';
import styles from './ReviewForm.module.css';
import React from "react";
import { Button, Input, Rating, Textarea } from "..";
import CloseIcon from './close.svg';
import { Controller, useForm } from "react-hook-form";
import { IReviewForm } from "./ReviewForm.interface";

export const ReviewForm = ({ className, productId, ...props }: ReviewFormProps): JSX.Element => {
    const {register, control, handleSubmit} = useForm<IReviewForm>();
    
    const submitForm = (data:IReviewForm)=>{
        console.log(data);
        
    };

    return (
        <form onSubmit={handleSubmit(submitForm)}>
        <div className={cn(styles.reviewForm, className)} {...props}>
            <Input {...register('name')} placeholder='Имя' />
            <Input {...register('title')} className={styles.title} placeholder='Заголовок отзыва'/>
            <div className={styles.rating}>
                <span>Оценка:</span>
                <Controller
                 control={control}
                  name="rating" render={({field})=>(
                    <Rating isEditable setRating={field.onChange} ref={field.ref} rating={field.value}/>
                )}/>
            </div>
            <Textarea {...register('description')} className={styles.placeholder} placeholder='Текст отзыва'/>
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
        </form>
    );
};