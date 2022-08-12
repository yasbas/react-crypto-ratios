import React from 'react';

import './card.styles.css';

export const Card = (props) => (
	<div className="card-container">
		{props.baseName} / {props.quoteName} : <strong>{props.ratio}</strong> ({props.basePrice} / {props.quotePrice})
	</div>
)