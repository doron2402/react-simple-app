import React, { PropTypes } from 'react';
import ConfirmBattle from '../components/ConfirmBattle';
import { getPlayersInfo } from '../utils/githubHelper';

const ConfirmBattleContainer = React.createClass({
	contextTypes: {
		router: PropTypes.object.isRequired
	},

	getInitialState() {
		return {
			isLoading: true,
			playerInfo: []
		}
	},

	async componentDidMount() {
		const { query } = this.props.location;
		// fetch users from github and update state
		try {
			const players = await getPlayersInfo([query.playerOne, query.playerTwo]);
			this.setState({
				isLoading: false,
				playerInfo: [players[0], players[1]]
			});
		} catch (error) {
			console.error(`Error: Get Player Info query: ${JSON.stringify(query)}`);
		}
	},

	componentWillMount() {
		console.log('will mount');
	},

	handleInitiateBattle() {
		this.context.router.push({
			pathname: '/results',
			state: {
				playersInfo: this.state.playerInfo
			}
		})
	},

	render() {
		return (
			<ConfirmBattle 
			isLoading={this.state.isLoading} 
			playerInfo={this.state.playerInfo} 
			onInitiateBattle={this.handleInitiateBattle}
			/>
		)
	}
});

export default ConfirmBattleContainer;
