var React = require('react');
var PropTypes = React.PropTypes;
var Results = require('../components/Results');
var githubHelpers = require('../utils/githubHelper');

var ResultsContainer = React.createClass({
	getInitialState() {
		return {
			isLoading: true,
			scores: []
		}
	},

	componentDidMount() {
		console.log(this.props.location.state.playersInfo);
		githubHelpers.battle(this.props.location.state.playersInfo)
		.then(scores => {
			this.setState({
				scores: scores,
				isLoading: false
			});
		});
	},

	render() {
		return (
			<Results 
				isLoading={this.props.isLoading}
				playersInfo={this.props.location.state.playersInfo}
				scores={this.props.scores}
			/>
		)
	}
});

module.exports = ResultsContainer;
