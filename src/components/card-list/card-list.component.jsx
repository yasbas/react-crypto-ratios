import React from 'react';
import {Card} from '../card/card.component';

import './card-list.styles.css';

const CardList = ({allPrices, pairs}) => {

	const calcRatio = (base, quote, allPrices) => {
		let ratio = 0
		const baseData = allPrices.filter(price => price.symbol == base);
		const quoteData = allPrices.filter(price => price.symbol == quote);
		if (
			baseData.length > 0 &&
			quoteData.length > 0
		) {
			ratio = baseData[0].price / quoteData[0].price
		}

		return ratio.toFixed(6)
	}

	return (
	<div className='card-list'>
		{
			pairs.map(pair =>
				<Card
					key={pair.base+pair.quote}
					base={pair.base}
					quote={pair.quote}
					ratio={ calcRatio(pair.base, pair.quote, allPrices) }

				/>
			)
		}
	</div>
)};

export default CardList