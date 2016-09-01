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

	componentDidMount() {
		const { query } = this.props.location;
		// fetch users from github and update state
		getPlayersInfo([query.playerOne, query.playerTwo])
		.then(response => {
			this.setState({
				isLoading: false,
				playerInfo: response
			});
		})
		.catch(err => {
			alert('error');
			console.error(err);
		});
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
