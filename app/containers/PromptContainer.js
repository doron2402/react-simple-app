import React  from 'react';
import { Link }  from 'react-router';
import PromptComponent  from '../components/Prompt';

const PromptContainer = React.createClass({
	contextTypes: {
		router: React.PropTypes.object.isRequired	
	},
	getInitialState() {
		return {
			username: ''
		}
	},
	handleUpdateUser(e) {

		this.setState({
			username: e.target.value
		});
	},
	handleSubmitUser(e) {
		e.preventDefault();
		const { username } = this.state;
		this.setState({
			username: ''
		});
		
		const { playerOne } = this.props.routeParams;

		if (playerOne) {
			// Go To Battle
			this.context.router.push({
				pathname: '/battle',
				query: {
					playerOne,
					playerTwo: username
				}
			})
		} else {
			// User one page
			this.context.router.push(`/playerTwo/${this.state.username}`);
		}
	},
	render() {
		return (
			<PromptComponent 
				header={this.props.route.header}
				username={this.state.username}
				onUpdateUser={this.handleUpdateUser}
				onSubmitUser={this.handleSubmitUser}
				/>
		);
	}
});

export default PromptContainer; 
