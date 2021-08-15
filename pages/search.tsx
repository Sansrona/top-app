import { GetStaticProps } from 'next';
import { useState } from 'react';
import { Button, Htag, P, Rating, Tag } from '../components';
import { IMenuItems } from '../interfaces/menu.interface';
import { withLayout } from '../layout/Layout';
import axios from 'axios';
import styles from '../styles/Home.module.css';

function Search({ menu }:IHome): JSX.Element {
  const [rating, setRating] = useState<number>(4);
  return (
    <h1>hi there</h1>
     
  );
}

export default withLayout(Search);

export const getStaticProps: GetStaticProps<IHome> = async () => {
  const firstCategory = 0;
  const { data: menu } = await axios.post<IMenuItems[]>(process.env.NEXT_PUBLIC_DOMAIN + '/api/top-page/find', {
    firstCategory
  });

  return {
    props: {
      menu,
      firstCategory
    },

  };

};

interface IHome extends Record<string, unknown> {
  menu: IMenuItems[];
  firstCategory:number;
}