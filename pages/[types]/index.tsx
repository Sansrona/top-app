import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';
import axios from 'axios';
import { withLayout } from '../../layout/Layout';
import { IMenuItems } from '../../interfaces/menu.interface';
import { firstLevelCategory } from '../../helpers/helpers';
import { ParsedUrlQuery } from 'querystring';
import { API } from '../../helpers/api';

function Type({firstCategory}:IType): JSX.Element {
  return (
    <h1>Type:{firstCategory}</h1>
  );
}

export default withLayout(Type);


export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths:firstLevelCategory.map(m=>'/' + m.route),
        fallback: true,
    };
};

export const getStaticProps: GetStaticProps<IType> = async ({ params }: GetStaticPropsContext<ParsedUrlQuery>) => {
    if (!params) {
        return {
            notFound: true
        };
    }
    const firstCategoryItem = firstLevelCategory.find(m=>m.route===params.type);
    if(!firstCategoryItem){
        return{
            notFound:true
        };
    }
  const { data: menu } = await axios.post<IMenuItems[]>(API.topPage.find, {
    firstCategory:firstCategoryItem.id
  });



  return {
    props: {
      menu,
      firstCategory:firstCategoryItem.id
    },

  };

};

interface IType extends Record<string, unknown> {
  menu: IMenuItems[];
  firstCategory:number;
}