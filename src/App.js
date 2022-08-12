import React, {Component} from "react";
import CardList from './components/card-list/card-list.component';

class App extends Component {
	constructor () {
		super();

		this.state = {
			allPrices: [],
			pairs: [
				{'base': 'MATIC', 'quote': 'XRP'},
				{'base': 'ALGO', 'quote': 'HNT'},
				{'base': 'ALGO', 'quote': 'DOT'}
			]
		}
	}

	loadData = () => {
		fetch('https://www.binance.com/api/v1/ticker/allPrices')
		.then(response => response.json())
		.then(
			json => {
				let uniqueCoins = this.extractUniqueCoinsFromPairs()
				json = json.filter(pair => uniqueCoins.includes(pair.symbol))
				// YADO: make suffix var as class or state var

				// Remove 'USDT' from symbols
				json = json.map(
					pair => {
						return {...pair, symbol: pair.symbol.replace('USDT', '')}
					}
				)
				this.setState({allPrices: json})
			}
		)
	}

	componentDidMount () {
		this.loadData()
	}

	extractUniqueCoinsFromPairs () {
		let uniqueValiesArr = []
		let suffix = 'USDT'
		this.state.pairs.forEach((item, index) => {
			if (uniqueValiesArr.indexOf(item.base) === -1) {
				uniqueValiesArr.push(item.base + suffix)
			}
			if (uniqueValiesArr.indexOf(item.quote) === -1) {
				uniqueValiesArr.push(item.quote + suffix)
			}
		})

		return uniqueValiesArr;
	}

	render () {
		const { allPrices } = this.state

		return (
			<div className="App">
				<button onClick={this.loadData}>Reload</button>
				<CardList allPrices={this.state.allPrices} pairs={this.state.pairs} />
			</div>
		);
	}
}

export default App;
