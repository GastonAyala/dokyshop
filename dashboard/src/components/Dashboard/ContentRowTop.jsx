import React from 'react';
import ContentRowCenter from './ContentRowCenter';
import ContentRowProducts from '../Products/ContentRowProducts';
function ContentRowTop() {
	return (
		<>
			{/*<!-- Content Row Top -->*/}
			<div className="container-fluid">
				<div className="d-sm-flex aligns-items-center justify-content-between mb-4">
					<h1 className="h3 mb-0 text-gray-800">Panel de control</h1>
				</div>
				{/*<!-- Content Row Products-->*/}
				<ContentRowProducts />
				<ContentRowCenter />
			</div>
			{/*<!--End Content Row Top-->*/}
		</>
	)

}
export default ContentRowTop;