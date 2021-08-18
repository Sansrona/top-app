import React from 'react';
import {ITopPageComponent} from './TopPageComponent.props';
import styles from './TopPageComponent.module.css';
import { Htag, Tag } from '../../components';
import Hhdata from '../../components/Hhdata/Hhdata';


function TopPageComponent({products, firstCategory,page}:ITopPageComponent): JSX.Element{
    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <Htag tag='h2'>{page.title}</Htag>
                <Tag size='m' color='gray'>{products.length}</Tag>
                сортировка
            </div>
            {products.map(p=>(<div key={p.title}>
                {p.title}
            </div>))}
            <div className={styles.hhWrapper}>
                <Htag tag='h2'>Вакансии - {page.category}</Htag>
                <Tag size='m' color='red'>hh.ru</Tag>
            </div>
            <Hhdata {...page.hh}/>

        </div>
    );
}

export default TopPageComponent;
