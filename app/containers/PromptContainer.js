var React = require('react');
var ReactRouter = require('react-router');
var Link = ReactRouter.Link;
var PromptComponent = require('../components/Prompt');

var PromptContainer = React.createClass({
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
		var username = this.state.username;
		this.setState({
			username: ''
		});
		
		if (this.props.routeParams.playerOne) {
			// Go To Battle
			this.context.router.push({
				pathname: '/battle',
				query: {
					playerOne: this.props.routeParams.playerOne,
					playerTwo: this.state.username
				}
			})
		} else {
			// User one page
			this.context.router.push('/playerTwo/' + this.state.username);
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

module.exports = PromptContainer; 