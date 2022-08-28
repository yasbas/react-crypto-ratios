import React from 'react';

import './position.styles.css';

const Position = ({position, ratio, mainCryptoPrice}) => {

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
		// YADO: What about when the position is reduced to 0 !?!
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
			<p>
			{position.title} {getPositionCloseProfitPercentage()}% {getPositionCloseProfitAmount()}{position.main_crypto} ${getPositionCloseProfitUsdt()}
			<br/>
			Size: {getPositionSize()}{position.main_crypto} [Account]
			{/*<hr/>*/}
			{/*Title: {position.title} <br/>*/}
			{/*Size: {getPositionSize()} <br/>*/}
			{/*Current Ratio: {ratio} <br/>*/}
			{/*Close Amount: {getPositionCloseAmount()} <br/>*/}
			{/*Close Profit Amount: {getPositionCloseProfitAmount()} <br/>*/}
			{/*Close Profit Percentage: {getPositionCloseProfitPercentage()} <br/>*/}
			{/*Close Profit USDT: {getPositionCloseProfitUsdt()} <br/>*/}
			</p>
		</div>
	)
};

export default Position;