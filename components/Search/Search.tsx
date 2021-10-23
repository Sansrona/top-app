import { SearchProps } from "./Search.props";
import cn from 'classnames';
import styles from './Search.module.css';
import React, { useState } from "react";
import { Button, Input } from "..";
import GlassIcon from './glass.svg';
import { useRouter } from "next/router";


export const Search  = ({ className, ...props }: SearchProps): JSX.Element => {
    const [search, setSearch] = useState<string>('');
    const router = useRouter();

    const onSearch = (e:React.ChangeEvent<HTMLInputElement>) =>  {
        setSearch(e.target.value);
    };

    const goToSearch =()=>{
        router.push({
            pathname:'/search',
            query:{
                q:search
            }
        });
    };

    const handleKeyDown = (event:React.KeyboardEvent)=>{
        if(event.key === 'Enter'){
            goToSearch();
        }
    };

    return (
        <div className={cn(className, styles.search)} {...props}>
            <Input 
            className={styles.input} 
            placeholder="Поиск..." 
            value={search} 
            onChange={onSearch}
            onKeyDown={handleKeyDown}
            />
            <Button 
            className={styles.button} 
            appearance='primary' 
            onClick={goToSearch}>
                <GlassIcon/>
            </Button>
        </div>
    );
};