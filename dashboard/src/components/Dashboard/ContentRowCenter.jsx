import React from 'react';
import LastProductInDb from '../Products/LastProductInDb';
import { ListCategories } from '../Categories/ListCategories';
import { ListSubcategories } from '../Subcategories/ListSubcategories';
import { MostSelled } from '../Orders/MostSelled';

function ContentRowCenter() {
    return (
        <div className="row">

            {/*<!-- Last Movie in DB -->*/}
            <LastProductInDb />
            {/*<!-- End content row last movie in Data Base -->*/}

            {/*<!-- Categories in DB -->*/}
            <div className="col-lg-6">
                <ListCategories />
                <ListSubcategories />
                <MostSelled />
            </div>
        </div>
    )
}

export default ContentRowCenter;