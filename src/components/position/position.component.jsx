import React from 'react';

import './position.styles.css';

const Position = ({position}) => {

	return (
		<div className="position-container">
			<span className="title">{position.title}</span>
			<span className={'profit-indicator ' + (position.profit_in_usd > 0 ? 'profit' : 'loss')}>
				<span><strong>{position.profit_in_percentages}</strong>%</span>
				<span><strong>{position.profit_in_coins}</strong>{position.main_crypto}</span>
				<span><strong>${position.profit_in_usd}</strong></span>
			</span>
			<br/>
			<span className="highlight">Size: <s>{position.main_crypto_amount_in}{position.main_crypto}</s> -> <strong>{position.temp_crypto_amount.toFixed(4)}</strong>{position.temp_crypto}</span>
			<br/>
			<span className="additional-info-2">Ratios: <strong className="highlight">{position.position_avg_ratio.toFixed(4)}</strong> / <span className={'ratio-indicator ' + (position.profit_in_usd > 0 ? 'profit' : 'loss')}>{position.position_current_ratio}</span> (AVG/current)</span>
			<br/>
			<span className="additional-info-2">Current prices: ${position.temp_crypto_current_price} / ${position.main_crypto_current_price} </span>
			<br/>
			<span className="additional-info-2">Account: <strong>{position.exchange_account}</strong></span>
		</div>
	)
};

export default Position;
