import React from 'react';
import LastProductInDb from '../Products/LastProductInDb';
import { ListCategories } from '../Categories/ListCategories';


function ContentRowCenter(){
    return (
        <div className="row">
            
            {/*<!-- Last Movie in DB -->*/}
            <LastProductInDb />
            {/*<!-- End content row last movie in Data Base -->*/}

            {/*<!-- Categories in DB -->*/}
            <ListCategories />

        </div>
    )
}

export default ContentRowCenter;