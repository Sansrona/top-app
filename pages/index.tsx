import Image from 'next/image';
import { Button, Htag } from '../components';
import styles from '../styles/Home.module.css';

export default function Home():JSX.Element {
  return (
    <>
      <Htag tag="h1">Текст</Htag>
      <Button appearence='primary'>Press here</Button>
      <Button appearence='ghost'>Press here2</Button>
    </>
  );
}
