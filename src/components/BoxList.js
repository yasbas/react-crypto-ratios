import React, {useState} from 'react'
import RatioBox from "./RatioBox";

const BoxList = () => {
	const [pairs, setPairs] = useState([]);
	const [newPairBase, setNewPairBase] = useState('')
	const [newPairQuote, setNewPairQuote] = useState('')

	const addPairBtnClick = () => {
		pairs.push({base: newPairBase, quote: newPairQuote})
		localStorage.setItem('cryptoRatioData', JSON.stringify(pairs))
		setPairs(JSON.parse(localStorage.getItem('cryptoRatioData')))
	};

	const loadSavedBtnClick = () => {
		let data = JSON.parse(localStorage.getItem('cryptoRatioData'))
		if (data === null) {
			data = [
				{'base': 'MATIC', 'quote': 'XRP'},
				{'base': 'ALGO', 'quote': 'HNT'},
				{'base': 'ALGO', 'quote': 'DOT'}
			]
		}
		setPairs(data)
	}

	const clearBtnClick = () => {
		setPairs([])
	}

    return (
		<div>
			<p>
				<button onClick={loadSavedBtnClick}>Load Saved</button>
				<button onClick={clearBtnClick}>Clear</button>
			</p>
			{
				pairs.map(pair =>
					<RatioBox key={pair.quote} base={pair.base} quote={pair.quote} />
				)
			}
			<p>
				<input type="text" onChange={e => setNewPairBase(e.target.value.toUpperCase())} placeholder="base"/> /
				<input type="text" onChange={e => setNewPairQuote(e.target.value.toUpperCase())} placeholder="quote"/>
			</p>
			<p><button onClick={addPairBtnClick}>Add Pair</button></p>
		</div>
    )
}

export default BoxList
