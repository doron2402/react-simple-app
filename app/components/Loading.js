var React = require('react');
var PropTypes = React.PropTypes;
var styles = require('../styles');

var Loading = React.createClass({
	propTypes: {
		text: PropTypes.string,
		speed: PropTypes.number
	},

	getInitialState() {
		this.originalText = this.props.text;
		return {
			text: this.originalText
		}
	},
	
	getDefaultProps() {
		return {
			text: 'Loading',
			speed: 300
		}
	},

	componentDidMount() {
		var stopper = `${this.originalText}...`;
		this.interval = setInterval(() => {
			if (this.state.text === stopper) {
				this.setState({
					text: this.originalText
				});
			} else {
				this.setState({
					text: `${this.state.text}.`
				});
			}
		}, this.props.speed);
	},
	
	componentWillUnmount() {
		clearInterval(this.interval);
	},

	render() {
		return (
			<div style={styles.container}>
				<p style={styles.content}>{this.state.text}</p>
			</div>
		);
	}
});


module.exports = Loading;