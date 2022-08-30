import React, {Component} from "react";
// import CardList from './components/card-list/card-list.component';
import PositionList from "./components/position-list/position-list.component";
import './App.css';

class App extends Component {
	constructor () {
		super();

		this.state = {
			allPrices: [],
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
		// fetch('http://localhost:8001/api/json', {referrerPolicy: 'unsafe-url'})
		fetch('https://yasbas.com/cryptobe/web/api/json')
			.then(response => response.json())
			.then(json => {
				// Return the positions, filtering the test positions
				let filteredPositions = json.positions.filter(position => !position.title.toLowerCase().includes('test'));
				filteredPositions = json.positions.filter(position => !position.title.toLowerCase().includes('[closed]'));
				filteredPositions = filteredPositions.filter(position => !position.title.toLowerCase().includes('test'))
				this.setState({positions: filteredPositions}
				)
			})

	}

	componentDidMount () {
		this.loadData()
	}

	extractUniqueCoinsFromPairs () {
		// Get the coins from the Positions list
		let uniqueValuesArr = []
		this.state.positions.forEach((item, index) => {
			if (uniqueValuesArr.indexOf(item.main_crypto + this.coinSuffix) === -1) {
				uniqueValuesArr.push(item.main_crypto + this.coinSuffix)
			}
			if (uniqueValuesArr.indexOf(item.temp_crypto + this.coinSuffix) === -1) {
				uniqueValuesArr.push(item.temp_crypto + this.coinSuffix)
			}
		})

		return uniqueValuesArr;
	}

	render () {
		return (
			<div className="App">
				{/*<CardList allPrices={this.state.allPrices} pairs={this.state.pairs} />*/}
				{/*<br/>*/}

				<PositionList positions={this.state.positions} allPrices={this.state.allPrices} />
				<p><button onClick={this.loadData} className="button">Reload</button></p>
				<span className="additional-info-2"> {this.state.lastLoadDateTime}</span>
			</div>
		);
	}
}

export default App;
