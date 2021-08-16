import React from 'react';
import {ITopPageComponent} from './TopPageomponent.props';


function TopPageComponent({products, firstCategory,page}:ITopPageComponent) {
    return (
        <div>
            {products && products.length}
        </div>
    );
}

export default TopPageComponent;
