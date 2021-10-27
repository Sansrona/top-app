import { GetStaticProps } from 'next';
import { useState } from 'react';
import { IMenuItems } from '../interfaces/menu.interface';
import { withLayout } from '../layout/Layout';
import axios from 'axios';
import { API } from '../helpers/api';

function Search({ menu }:IHome): JSX.Element {
  const [rating, setRating] = useState<number>(4);
  return (
    <h1>hi there</h1>
     
  );
}

export default withLayout(Search);

export const getStaticProps: GetStaticProps<IHome> = async () => {
  const firstCategory = 0;
  const { data: menu } = await axios.post<IMenuItems[]>(API.topPage.find, {
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