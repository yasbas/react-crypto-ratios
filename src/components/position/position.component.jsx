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

	const getPositionAvgRatio = () => {
		return (getPositionSize() / position.temp_crypto_amount).toFixed(4)
	}

	return (
		<div className="position-container">
			<a href={'https://www.tradingview.com/chart/?symbol=BINANCE%3A'+position.temp_crypto+'USDT'} target="_blank"  rel="noreferrer">
			<span className="title">{position.title}</span>
			</a>

			<span className={'profit-indicator ' + (getPositionCloseProfitAmount() > 0 ? 'profit' : 'loss')}>
				<span><strong>{getPositionCloseProfitPercentage()}</strong>%</span>
				<span><strong>{getPositionCloseProfitAmount()}</strong>{position.main_crypto}</span>
				<span><strong>${getPositionCloseProfitUsdt()}</strong></span>
			</span>
			<br/>
			<span className="highlight">Size: <s>{getPositionSize()}{position.main_crypto}</s> -> <strong>{position.temp_crypto_amount}</strong>{position.temp_crypto}</span>
			<br/>
			<span className="additional-info-2">Ratios: <strong className="highlight">{getPositionAvgRatio()}</strong> / <span className={'ratio-indicator ' + (getPositionCloseProfitAmount() > 0 ? 'profit' : 'loss')}>{ratio}</span> (AVG/current)</span>
			<br/>
			<span className="additional-info-2">Current prices: ${parseFloat(tempCryptoPrice).toFixed(4)} / ${parseFloat(mainCryptoPrice).toFixed(4)} </span>
			<br/>
			<span className="additional-info-2">Account: <strong>{position.exchange_account}</strong></span>

		</div>
	)
};

export default Position;
