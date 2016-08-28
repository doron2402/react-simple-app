var React = require('react');
const PropTypes = React.PropTypes;
var ConfirmBattle = require('../components/ConfirmBattle');
var githubHelper = require('../utils/githubHelper');

var ConfirmBattleContainer = React.createClass({
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
		console.log('did mount');
		var query = this.props.location.query;
		// fetch users from github and update state
		githubHelper.getPlayersInfo([query.playerOne, query.playerTwo])
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

module.exports = ConfirmBattleContainer;