import React, { useEffect, useReducer } from 'react';
import {ITopPageComponent} from './TopPageComponent.props';
import styles from './TopPageComponent.module.css';
import { Htag, Tag, Hhdata,Advantages, Sort, ProductBlock } from '../../components';
import { TopPageLevel } from '../../interfaces/toppage.interface';
import { SortEnum } from '../../components/Sort/Sort.props';
import { sortReducer } from '../../components/Sort/sort.reducer';

function TopPageComponent({products, firstCategory,page}:ITopPageComponent): JSX.Element{
    const [{products: sortedProducts, sort}, dispatch] = useReducer(sortReducer, {products, sort: SortEnum.Rating});
    
    const setSort = (sort:SortEnum) => {
        dispatch({type: sort});
    };

    useEffect(()=>{
        dispatch({type:'reset', initialState:products});
    },[products]);

    return (
        <div className={styles.container}>
            <div className={styles.title}>
                <Htag tag='h2'>{page.title}</Htag>
                <Tag size='m' color='gray' aria-label={products.length+' элементов'}>{products.length}</Tag>
                <Sort sort={sort} setSort={setSort} />
            </div>
            <div>
                {sortedProducts && sortedProducts.map(p=><ProductBlock layout key={p._id} product={p} />)}
            </div>              
            <div className={styles.hhWrapper}>
                <Htag tag='h2'>Вакансии - {page.category}</Htag>
                <Tag size='m' color='red'>hh.ru</Tag>
            </div>
            {firstCategory === TopPageLevel.Courses && page.hh && <Hhdata {...page.hh}/>}
            {page.advantages && page.advantages.length>0 && <>
                <Htag tag='h2'>Преимущества</Htag>
                <Advantages advantages={page.advantages} />
            </>}
            {page.seoText && <div dangerouslySetInnerHTML={{__html: page.seoText}}/>}
            {page.tags.map(tag => <Tag key={tag} size='s' color='primary'>{tag}</Tag>) }
        </div>
    );
}

export default TopPageComponent;
