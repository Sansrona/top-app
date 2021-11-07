import { GetStaticProps } from 'next';
import { useState } from 'react';
import { Button, Htag, P, Rating, Tag } from '../components';
import { IMenuItems } from '../interfaces/menu.interface';
import { withLayout } from '../layout/Layout';
import axios from 'axios';
import { API } from '../helpers/api';

function Home({ menu }:IHome): JSX.Element {
  const [rating, setRating] = useState<number>(4);


  return (
    <>
      <Htag tag="h1">Текст</Htag>
      <Button appearance='primary' arrow='right'>Press here</Button>
      <Button appearance='ghost' arrow='down'>Press here2</Button>
      <P font='14'>Hiiii</P>
      <P font='16'>Hiiii</P>
      <P font='18'>Hiiii</P>
      <Tag size='s' color='primary'>Button</Tag>
      <Tag size='m' color='primary'>Button</Tag>
      <Tag size='m' color='ghost'>Button</Tag>
      <Tag size='m' color='red'>Button</Tag>
      <Tag size='m' color='green'>Button</Tag>
      <Tag size='m' color='gray'>Button</Tag>
      <Rating isEditable rating={rating} setRating={setRating}></Rating>
    </>
  );
}

export default withLayout(Home);

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