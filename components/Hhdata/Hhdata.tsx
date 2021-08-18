import React from 'react';
import { Card } from '../Card/Card';
import styles from './Hddata.module.css';
import { IHhdata } from './Hhdata.props';
import RateIcon from './rate.svg';

function Hhdata({ juniorSalary, middleSalary, seniorSalary, count }: IHhdata): JSX.Element {
    return (
        <div className={styles.hhdata}>
            <Card className={styles.count}>
                <div className={styles.title}>Всего вакансий</div>
                <div className={styles.countValue}>{count}</div>
            </Card>
            <Card className={styles.salary}>
                <div>
                    <div className={styles.title}>Начальный</div>
                    <div className={styles.salaryValue}>{juniorSalary}</div>
                    <div className={styles.rating}>
                        <RateIcon className={styles.filled} />
                        <RateIcon />
                        <RateIcon />
                    </div>
                </div>
                <div>
                    <div className={styles.title}>Средний</div>
                    <div className={styles.salaryValue}>{middleSalary}</div>
                    <div className={styles.rating}>
                        <RateIcon className={styles.filled}/>
                        <RateIcon className={styles.filled}/>
                        <RateIcon />
                    </div>
                </div>
                <div>
                    <div className={styles.title}>Профессионал</div>
                    <div className={styles.salaryValue}>{seniorSalary}</div>
                    <div className={styles.rating}>
                        <RateIcon className={styles.filled}/>
                        <RateIcon className={styles.filled}/>
                        <RateIcon className={styles.filled}/>
                    </div>
                </div>
            </Card>
        </div>
    );
}

export default Hhdata;