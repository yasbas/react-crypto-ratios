import React from 'react';

import './card.styles.css';

export const Card = (props) => (
	<div className="card-container">
		{props.base} / {props.quote} : {props.ratio}
	</div>
)