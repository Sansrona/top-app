import { ProductProps } from "./Product.props";
import cn from 'classnames';
import styles from './Product.module.css';
import React, { ForwardedRef, forwardRef } from "react";
import Image from 'next/image';
import { Button, Card, Divider, Rating, Review, ReviewForm, Tag } from "..";
import {delvOfNumber, makeRub} from '../../helpers/helpers';
import {motion} from 'framer-motion';


export const ProductBlock = motion(forwardRef(({ product,className,...props }: ProductProps, ref:ForwardedRef<HTMLDivElement>): JSX.Element => {
    const [isReviewOpen, setReviewOpen]= React.useState<boolean>(false);
    const reviewRef = React.useRef<HTMLDivElement>(null);

    const scrollToReview = () => {
        setReviewOpen(true);
        reviewRef.current?.scrollIntoView({
            behavior: 'smooth',
            block:'start'
        });
        reviewRef.current?.focus();
    };

    const variantsReview = {
        visible:{
            opacity:1,
            height:'auto'
        },
        hidden:{opacity:0,
            height:0}
    };

    return (
        <div className={className} {...props}>
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
                <span><span className="visuallyHidden">цена</span>{makeRub(product.price)}</span>
                {product.oldPrice && <Tag className={styles.oldPrice} color='green'>
                <span className="visuallyHidden">скидка</span>
                    {makeRub(product.price - product.oldPrice)}</Tag>}
                </div>
            <div className={styles.credit}>
            <span className="visuallyHidden">кредит</span>
                {makeRub(product.credit)}/
                <span className={styles.month}>мес</span>
            </div>
            <div className={styles.rating}>
            <span className="visuallyHidden">рейтинг {product.reviewAvg ?? product.initialRating}</span>
                <Rating rating={product.reviewAvg ?? product.initialRating} /></div>
            <div className={styles.tags}>{product.tags.map(tag=><Tag key={tag} className={styles.category} color='ghost'>{tag}</Tag>)}</div>
            <div className={styles.priceTitle} aria-hidden='true'>цена</div>
            <div className={styles.creditTitle} aria-hidden='true'>кредит</div>
            <div className={styles.rateTitle}><a href='#ref' onClick={scrollToReview}>{product.reviewCount} {delvOfNumber(product.reviewCount, ['отзыв', 'отзыва','отзывов'])}</a></div>
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
        <motion.div
            variants={variantsReview}
            animate={isReviewOpen?'visible':'hidden'}
            initial='hidden'
            >

        <Card color='blue' ref={reviewRef} tabIndex={isReviewOpen?0:-1} className={styles.reviews}>
            {product.reviews.map(r=>(
                <div key={r._id}>
                    <Review  review={r}/>
                    <Divider />
                </div>
))} 
        <ReviewForm productId={product._id} isOpened={isReviewOpen}/>
        </Card>
        </motion.div>
        </div>
    );
}));