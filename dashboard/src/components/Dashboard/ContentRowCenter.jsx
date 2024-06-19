import React from 'react';
import LastProductInDb from '../Products/LastProductInDb';
import { ListCategories } from '../Categories/ListCategories';
import { ListSubcategories } from '../Subcategories/ListSubcategories';
import { MostSelled } from '../Orders/MostSelled';

function ContentRowCenter() {
    return (
        <div className="row">
            {/*<!-- Last Product in DB -->*/}
            <LastProductInDb />
            {/*<!-- End content row last Product in Data Base -->*/}
            
            <div className="col-lg-6">
                <ListCategories />
                <ListSubcategories />
                <MostSelled />
            </div>
        </div>
    )
}

export default ContentRowCenter;