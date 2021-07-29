import { useState } from 'react';
import { Button, Htag, P, Rating, Tag } from '../components';
import { Layout } from '../layout/Layout';
import styles from '../styles/Home.module.css';

export default function Home():JSX.Element {
  const [rating, setRating] = useState<number>(4);
  return (
    <Layout>
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
      <Tag size='m'color='green'>Button</Tag>
      <Tag size='m'color='gray'>Button</Tag>
      <Rating isEditable rating={rating} setRating={setRating}></Rating>
    </Layout>
  );
}
