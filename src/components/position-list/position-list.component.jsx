import React from 'react';
import Position from '../position/position.component';

import './position-list.styles.css';

const PositionList = ({positions, allPrices}) => {

	const getPrice = (coin/*, allPrices*/) => {
		let result = allPrices.filter(price => price.symbol === coin);
		return result.length > 0 ? parseFloat(result[0].price).toFixed(6) : 0;
	}

	const calcRatio = (base, quote/*, allPrices*/) => {
		let ratio = 0
		const basePrice = getPrice(base, allPrices)
		const quoteData = getPrice(quote, allPrices);
		if (basePrice > 0 && quoteData > 0) {
			ratio = basePrice / quoteData
		}
		//console.log('calculation ration for '+base+'/'+quote+' ... '+ratio)
		return ratio.toFixed(6)
	}

	return (
		<div className='position-list'>
			{/* YADO: Get positions coins prices and pass it to Position component to calculate and display current position */}

			{/*{console.log(allPrices)}*/}
			{
				positions.map(position =>
					<Position
						key={position.title}
						position={position}
						ratio={ calcRatio(position.temp_crypto, position.main_crypto/*, allPrices*/) }
						mainCryptoPrice={getPrice(position.main_crypto)}
					/>
				)
			}
		</div>
	)
};

export default PositionList;
