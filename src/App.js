import React, {Component} from "react";
import CardList from './components/card-list/card-list.component';
import './App.css';

class App extends Component {
	constructor () {
		super();

		this.state = {
			allPrices: [],
			pairs: [
				{'base': 'MATIC', 'quote': 'XRP'},
				{'base': 'ALGO', 'quote': 'HNT'},
				{'base': 'ALGO', 'quote': 'DOT'},
				{'base': 'DOT', 'quote': 'LINK'},
			],
			lastLoadDateTime: ''
		}

		this.coinSuffix = 'USDT'
	}

	loadData = () => {
		fetch('https://www.binance.com/api/v1/ticker/allPrices')
		.then(response => response.json())
		.then(
			json => {
				let uniqueCoins = this.extractUniqueCoinsFromPairs()
				json = json.filter(pair => uniqueCoins.includes(pair.symbol))

				// Remove 'USDT' from symbols
				json = json.map(
					pair => {
						return {...pair, symbol: pair.symbol.replace(this.coinSuffix, '')}
					}
				)
				this.setState({allPrices: json})
				this.setState({lastLoadDateTime: new Date().toLocaleString()})
			}
		)
	}

	componentDidMount () {
		this.loadData()
	}

	extractUniqueCoinsFromPairs () {
		let uniqueValiesArr = []
		this.state.pairs.forEach((item, index) => {
			if (uniqueValiesArr.indexOf(item.base) === -1) {
				uniqueValiesArr.push(item.base + this.coinSuffix)
			}
			if (uniqueValiesArr.indexOf(item.quote) === -1) {
				uniqueValiesArr.push(item.quote + this.coinSuffix)
			}
		})

		return uniqueValiesArr;
	}

	render () {
		return (
			<div className="App">
				<CardList allPrices={this.state.allPrices} pairs={this.state.pairs} />
				<br/>
				<button onClick={this.loadData} className="button">Reload</button>
				<span className="load-datetime"> {this.state.lastLoadDateTime}</span>
			</div>
		);
	}
}

export default App;
