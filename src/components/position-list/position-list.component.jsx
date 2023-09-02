import React from 'react';
import Position from '../position/position.component';

import './position-list.styles.css';

const PositionList = ({positions}) => {

	return (
		<div className='position-list'>
			{
				positions.map(position =>
					<Position
						key={position.title}
						position={position}
					/>
				)
			}
		</div>
	)
};

export default PositionList;
