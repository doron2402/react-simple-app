var React = require('react');
var PropTypes = React.PropTypes;
var Link = require('react-router').Link;
var styles = require('../styles');
var UserDetails = require('./UserDetails');
var UserDetailsWrapper = require('./UserDetailsWrapper');
var MainContainer = require('./MainContainer');

function StartOver() {
	return (
		<div className="col-sm-12" style={styles.space}>
			<Link to="/playerOne">
				<button  type="button" className="btn btn-lg btn-danger">
					Start Over
				</button>
			</Link>
		</div>
	)
}

function Results(props) {

	if (!!props.isLoading) {
		return (
			<p>Loading...</p>
		)
	}

	if (props.scores[0] === props.scores[1]) {
		return (
			<MainContainer>
				<h1>It's a tie!</h1>
				<StartOver />
			</MainContainer>
		)
	}

	var winnerIndex = props.scores[0] > props.scores[1] ? 0 : 1;
	var loserIndex = winnerIndex === 0 ? 1 : 0;
	console.log(props);
	return (
		<MainContainer>
			<h1>Results</h1>
			<div className="col-sm-8 col-sm-offset-2">
				<UserDetailsWrapper header="Winner">
					<UserDetails score={props.scores[winnerIndex]} info={props.playersInfo[winnerIndex]} />
				</UserDetailsWrapper>
				<UserDetailsWrapper header="Loser">
					<UserDetails score={props.scores[loserIndex]} info={props.playersInfo[loserIndex]} />
				</UserDetailsWrapper>
			</div>
			<StartOver />
		</MainContainer>
	)
}

Results.propTypes = {
	isLoading: PropTypes.bool.isRequired,
	playersInfo: PropTypes.array.isRequired,
	scores: PropTypes.array.isRequired
};

module.exports = Results;
