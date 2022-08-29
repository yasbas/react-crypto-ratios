import React from 'react';

import './position.styles.css';

const Position = ({position, ratio, mainCryptoPrice, tempCryptoPrice}) => {

	const getPositionSize = () => {
		return position.main_crypto_amount_in - position.main_crypto_amount_out
	}

	const getPositionCloseAmount = () => {
		return (position.main_crypto_amount_out + (position.temp_crypto_amount*ratio)).toFixed(4)
	}

	const getPositionCloseProfitAmount = () => {
		if (getPositionSize() > 0) {
			return (getPositionCloseAmount() - getPositionSize()).toFixed(4)
		} else {
			return (getPositionCloseAmount() - position.main_crypto_amount_in).toFixed(4)
		}
	}

	const getPositionCloseProfitPercentage = () => {
		if (getPositionSize() > 0) {
			return (getPositionCloseProfitAmount() / getPositionSize() * 100).toFixed(2)
		} else {
			return (getPositionCloseProfitAmount() / position.main_crypto_amount_in * 100).toFixed(2)
		}
	}

	const getPositionCloseProfitUsdt = () => {
		return (getPositionCloseProfitAmount() * mainCryptoPrice).toFixed(2)
	}

	return (
		<div className="position-container">
			<span className="title">{position.title}</span>

			<span className={'profit-indicator ' + (getPositionCloseProfitAmount() > 0 ? 'profit' : 'loss')}>
				<span><strong>{getPositionCloseProfitPercentage()}</strong>%</span>
				<span><strong>{getPositionCloseProfitAmount()}</strong>{position.main_crypto}</span>
				<span><strong>${getPositionCloseProfitUsdt()}</strong></span>
			</span>
			<br/>
			<span className="additional-info">Size: <strong>{getPositionSize()}</strong>{position.main_crypto} Account: <strong>{position.exchange_account}</strong></span>
			<br/>
			<span className="additional-info-2">(${parseFloat(tempCryptoPrice).toFixed(4)} / ${parseFloat(mainCryptoPrice).toFixed(4)}) ({ratio})</span>

		</div>
	)
};

export default Position;