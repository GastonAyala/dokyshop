import React from 'react';
import LastProductInDb from '../Products/LastProductInDb';
import LastUserInDb from '../Users/LastUserInDb';
import { ListCategories } from '../Categories/ListCategories';
import { ListSubcategories } from '../Subcategories/ListSubcategories';
import { MostSelled } from '../Orders/MostSelled';

function ContentRowCenter() {
    return (
        <div className="row">
            <LastProductInDb />
            <LastUserInDb />
            <ListCategories />
            <ListSubcategories />
            <MostSelled />
        </div>
    )
}

export default ContentRowCenter;