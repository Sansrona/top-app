import { ReviewFormProps } from "./ReviewForm.props";
import cn from 'classnames';
import styles from './ReviewForm.module.css';
import React, { useState } from "react";
import { Button, Input, Rating, Textarea } from "..";
import CloseIcon from './close.svg';
import { Controller, useForm } from "react-hook-form";
import { IReviewForm, IReviewResponse } from "./ReviewForm.interface";
import axios from "axios";
import { API } from "../../helpers/api";

export const ReviewForm = ({ className,isOpened, productId, ...props }: ReviewFormProps): JSX.Element => {
    const {register, control, handleSubmit, formState: {errors}, reset} = useForm<IReviewForm>();
    const [isSuccess,setIsSuccess] = useState<boolean>(false);
    const [error, setError] = useState<string>();

    const submitForm = async (formData:IReviewForm)=>{
        try{
            const {data} = await axios.post<IReviewResponse>(API.review.createDemo, {...formData, productId});        
                if(data.message){
                    setIsSuccess(true);
                    reset();    
                } else {
                    setError('Что-то пошло не так');
                }
        } catch (e){
                setError((e as Error).message);
        }
    };

    return (
        <form onSubmit={handleSubmit(submitForm)}>
        <div className={cn(styles.reviewForm, className)} {...props}>
            <Input 
                {...register('name',{required:{value:true, message:'Заполните ваше имя'}})} 
                placeholder='Имя'
                error={errors.name}
                tabIndex={isOpened?0:-1}
                />
            <Input 
            {...register('title',{required:{value:true, message:'Заполните заголовок'}})} 
            className={styles.title} 
            error={errors.title}
            tabIndex={isOpened?0:-1}
            placeholder='Заголовок отзыва'/>
            <div className={styles.rating}>
                <span>Оценка:</span>
                <Controller
                    control={control}
                    name="rating"
                    rules={{required:{value:true, message:'Оцените курс'}}}
                    render={({field})=>(
                        <Rating 
                        error={errors.rating}
                        isEditable 
                        setRating={field.onChange} 
                        ref={field.ref}
                        tabIndex={isOpened?0:-1} 
                        rating={field.value}/>
                )}/>
            </div>
            <Textarea 
                {...register('description',{required:{value:true, message:'Заполните описание'}})} 
                className={styles.placeholder} 
                error={errors.description}
                tabIndex={isOpened?0:-1}
                placeholder='Текст отзыва'/>
            <div className={styles.submit}>
                <Button tabIndex={isOpened?0:-1}  appearance='primary'>Отправить</Button>
                <span className={styles.info}>* Перед публикацией отзыв пройдет предварительную модерацию и проверку</span>
            </div>
        </div>
        {isSuccess && <div className={cn(styles.success, styles.panel)}>
            <div className={styles.successTitle}>Ваш отзыв отправлен</div>
            <div className={styles.success}>Спасибо, ваш отзыв будет опубликован после проверки</div>
            <CloseIcon className={styles.closeIcon} onClick={()=>{setIsSuccess(false);}}  />
        </div>}
        {error && <div className={cn(styles.error, styles.panel)}>
        Что-то пошло не так, перезагрузите страницу
           <CloseIcon className={styles.closeIcon}  onClick={()=>{setError(undefined);}}/>
        </div>}
        </form>
    );
};