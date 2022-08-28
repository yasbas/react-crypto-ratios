import React, {Component} from "react";
import CardList from './components/card-list/card-list.component';
import PositionList from "./components/position-list/position-list.component";
import './App.css';

class App extends Component {
	constructor () {
		super();

		this.state = {
			allPrices: [],
			pairs: [
				{'base': 'ALGO', 'quote': 'DOT'},
				{'base': 'ALPACA', 'quote': 'XRP'},
				{'base': 'ALPACA', 'quote': 'HNT'},
				{'base': 'JOE', 'quote': 'XRP'},
				{'base': 'MATIC', 'quote': 'XRP'},
				{'base': 'ALGO', 'quote': 'HNT'},
			],
			positions: [],
			lastLoadDateTime: ''
		}

		this.coinSuffix = 'USDT'
	}

	loadData = () => {
		// Load current prices
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

		// Load positions
		// CORS issues: https://developer.okta.com/blog/2021/08/02/fix-common-problems-cors#how-to-solve-a-simple-cors-issue
		fetch('http://localhost:8001/api/json')
			.then(response => response.json())
			.then(json => {
				//console.log(json)
				this.setState({positions: json.positions})
			})

	}

	componentDidMount () {
		this.loadData()
	}

	extractUniqueCoinsFromPairs () {
		let uniqueValuesArr = []
		this.state.pairs.forEach((item, index) => {
			if (uniqueValuesArr.indexOf(item.base) === -1) {
				uniqueValuesArr.push(item.base + this.coinSuffix)
			}
			if (uniqueValuesArr.indexOf(item.quote) === -1) {
				uniqueValuesArr.push(item.quote + this.coinSuffix)
			}
		})

		return uniqueValuesArr;
	}

	render () {
		return (
			<div className="App">
				<CardList allPrices={this.state.allPrices} pairs={this.state.pairs} />
				<br/>
				<button onClick={this.loadData} className="button">Reload</button>
				<span className="load-datetime"> {this.state.lastLoadDateTime}</span>

				<PositionList positions={this.state.positions} allPrices={this.state.allPrices} />
			</div>
		);
	}
}

export default App;
