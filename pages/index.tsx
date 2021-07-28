import { Button, Htag } from '../components';
import styles from '../styles/Home.module.css';

export default function Home():JSX.Element {
  return (
    <>
      <Htag tag="h1">Текст</Htag>
      <Button appearance='primary' arrow='right'>Press here</Button>
      <Button appearance='ghost' arrow='down'>Press here2</Button>
    </>
  );
}
