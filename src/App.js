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
			lastLoadDateTime: '',
			isChecked: false,
			intervalId: null,
			intervalDurationInSeconds: 5
		}
	}

	loadData = () => {
		// Load positions
		// CORS issues: https://developer.okta.com/blog/2021/08/02/fix-common-problems-cors#how-to-solve-a-simple-cors-issue
		// fetch('http://localhost/api/json'/*, {referrerPolicy: 'unsafe-url'}*/)
		// fetch('https://yasbas.com/cryptobe/web/api/json')
		fetch('http://159.89.99.194/web/api/json')
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

	handleRefreshCheckboxChange = (event) => {
		this.setState({ isChecked: event.target.checked });
	}

	handleRefreshIntervalChange = (event) => {
		this.setState({ intervalDurationInSeconds: event.target.value });
	}


	componentDidMount () {
		this.loadData()
	}

	componentWillUnmount() {
		clearInterval(this.state.intervalId);
	}

	componentDidUpdate(prevProps, prevState) {
		// If a new value is selected for the refresh interval - stop the refreshing,
		// as the setInterval must be restarted.
		if (prevState.intervalDurationInSeconds !== this.state.intervalDurationInSeconds) {
			this.setState({isChecked: false});
		}
		if (prevState.isChecked !== this.state.isChecked) {
			// Create the refresh interval routine
			if (this.state.isChecked) {
				const id = setInterval(() => {
					this.loadData()
				}, this.state.intervalDurationInSeconds*1000);
				this.setState({ intervalId: id });
			}
			// Dismiss the refresh routine
			else {
				clearInterval(this.state.intervalId);
				this.setState({ intervalId: null });
			}
		}
	}



	render () {
		return (
			<div className="App">
				<PositionList positions={this.state.positions} />
				<p><button onClick={this.loadData} className="button">Reload</button></p>
				<span className="additional-info-2"> {this.state.lastLoadDateTime}</span>
				<p>
					<input
						className="big-checkbox"
						type="checkbox"
						checked={this.state.isChecked}
						onChange={this.handleRefreshCheckboxChange}
					/>
					<label className="white-text">Enable scheduled execution for every </label>
					<select
						value={this.state.intervalDurationInSeconds}
						onChange={this.handleRefreshIntervalChange}
					>
						<option value={3}>3 sec.</option>
						<option value={5}>5 sec.</option>
						<option value={10} defaultChecked>10 sec.</option>
						<option value={20}>20 sec.</option>
						<option value={30}>30 sec.</option>
						<option value={45}>45 sec.</option>
						<option value={60}>1 min.</option>
						<option value={120}>2 min.</option>
						<option value={180}>3 min.</option>
						<option value={300}>5 min.</option>
						<option value={600}>10 min.</option>
						<option value={900}>15 min.</option>
					</select>
				</p>
			</div>
		);
	}
}

export default App;
