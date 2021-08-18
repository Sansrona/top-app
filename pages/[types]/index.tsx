import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';
import { useState } from 'react';
import axios from 'axios';
import { withLayout } from '../../layout/Layout';
import { IMenuItems } from '../../interfaces/menu.interface';
import { firstLevelCategory } from '../../helpers/helpers';
import { ParsedUrlQuery } from 'node:querystring';

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
  const { data: menu } = await axios.post<IMenuItems[]>(process.env.NEXT_PUBLIC_DOMAIN + '/api/top-page/find', {
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