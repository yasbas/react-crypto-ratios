import React from 'react';

import './card.styles.css';

export const Card = (props) => (
	<div className="card-container">
		{props.baseName} / {props.quoteName} : {props.ratio} ({props.basePrice} / {props.quotePrice})
	</div>
)