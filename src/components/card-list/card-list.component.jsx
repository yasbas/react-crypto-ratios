import React from 'react';
import {Card} from '../card/card.component';

import './card-list.styles.css';

const CardList = ({allPrices, pairs}) => {

	const getPrice = (coin, allPrices) => {
		let result = allPrices.filter(price => price.symbol == coin);
		return result.length > 0 ? result[0].price : 0;
	}

	const calcRatio = (base, quote, allPrices) => {
		let ratio = 0
		const basePrice = getPrice(base, allPrices)
		const quoteData = getPrice(quote, allPrices);
		if (basePrice > 0 && quoteData > 0) {
			ratio = basePrice / quoteData
		}

		return ratio.toFixed(6)
	}

	return (
	<div className='card-list'>
		{
			pairs.map(pair =>
				<Card
					key={pair.base+pair.quote}
					baseName={pair.base}
					basePrice={getPrice(pair.base, allPrices)}
					quoteName={pair.quote}
					quotePrice={getPrice(pair.quote, allPrices)}
					ratio={ calcRatio(pair.base, pair.quote, allPrices) }

				/>
			)
		}
	</div>
)};

export default CardList