import { ProductProps } from "./Product.props";
import cn from 'classnames';
import styles from './Product.module.css';
import React from "react";
import Image from 'next/image';
import { Button, Card, Divider, Rating, Review, Tag } from "..";
import {delvOfNumber, makeRub} from '../../helpers/helpers';


export const ProductBlock = ({ product,...props }: ProductProps): JSX.Element => {
    const [isReviewOpen, setReviewOpen]= React.useState<boolean>(false);
    
    return (
        <>
        <Card className={styles.product}>
            <div className={styles.logo}>
                <Image
                    src={process.env.NEXT_PUBLIC_DOMAIN + product.image}
                    alt={product.title}
                    width={70}
                    height={70}
                />
                </div>
            <div className={styles.title}>{product.title}</div>
            <div className={styles.price}>
                {makeRub(product.price)}
                {product.oldPrice && <Tag className={styles.oldPrice} color='green'>{makeRub(product.price - product.oldPrice)}</Tag>}
                </div>
            <div className={styles.credit}>
                {makeRub(product.credit)}/
                <span className={styles.month}>мес</span>
            </div>
            <div className={styles.rating}><Rating rating={product.reviewAvg ?? product.initialRating} /></div>
            <div className={styles.tags}>{product.tags.map(tag=><Tag key={tag} className={styles.category} color='ghost'>{tag}</Tag>)}</div>
            <div className={styles.priceTitle}>цена</div>
            <div className={styles.creditTitle}>кредит</div>
            <div className={styles.rateTitle}>{product.reviewCount} {delvOfNumber(product.reviewCount, ['отзыв', 'отзыва','отзывов'])}</div>
            <Divider className={styles.hr} />
            <div className={styles.description}>{product.description} </div>
            <div className={styles.feature}>
                {product.characteristics && product.characteristics.map(char=>(
                    <div className={styles.characteristics} key={char.name}>
                        <span className={styles.characteristicsName}>{char.name}</span>
                        <span className={styles.characteristicsDots}></span>
                        <span className={styles.characteristicsValue}>{char.value}</span>
                    </div>
                ))}    
            </div>
            <div className={styles.advBlock}>
                {product.advantages && <div className={styles.advantages}>
                    <div className={styles.advTitle}>Преимущества</div>
                    {product.advantages}
                </div>}
                {product.disadvantages && <div className={styles.disadvantages}>
                    <div className={styles.advTitle}>Недостатки</div>
                    {product.disadvantages}
                </div>}
            </div>
            <Divider className={cn(styles.hr, styles.hr2)} />
            <div className={styles.actions}>
                <Button appearance='primary'>Узнать подробнее</Button>
                <Button 
                className={styles.reviewButton} 
                appearance='ghost'
                arrow={isReviewOpen?'down':'right'}
                onClick={()=>setReviewOpen(!isReviewOpen)}
                >Читать отзывы</Button>
            </div>
        </Card>
        <Card color='blue' className={cn(styles.reviews, {
            [styles.open]: isReviewOpen,
            [styles.closed]: !isReviewOpen,
        })}>
            {product.reviews.map(r=>(
                <>
                    <Review key={r._id} review={r}/>
                    <Divider />
                </>
))}
        </Card>
        </>
    );
};