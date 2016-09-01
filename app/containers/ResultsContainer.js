import React, { PropTypes } from 'react';
import Results from '../components/Results';
import { battle } from '../utils/githubHelper';

const ResultsContainer = React.createClass({
	getInitialState() {
		return {
			isLoading: true,
			scores: []
		}
	},

	async componentDidMount() {
		try {
			const scores =  await battle(this.props.location.state.playersInfo);
			this.setState({
				scores: scores || 0,
				isLoading: false
			});	
		} catch (err) {
			console.error('error in ResultsContainer githubHelpers battle');
			console.error(err);
		}
	},

	render() {
		return (
			<Results 
				isLoading={this.state.isLoading}
				playersInfo={this.props.location.state.playersInfo}
				scores={this.state.scores}
			/>
		)
	}
});

export default ResultsContainer;
