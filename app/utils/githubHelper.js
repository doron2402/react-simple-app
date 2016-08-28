var axios = require('axios');
const githubApi = 'https://api.github.com';
const github = {
	id: '',
	secret: '',
	getParams() {
		return '?client_id=' + this.id + '&client_secret=' + this.secret;
	}
};

function getUserInfo(username) {
	return axios.get(githubApi + '/users/' + username + github.getParams())
}


function getRepos(username) {
	return axios.get(githubApi + '/users/' + username + '/repos' + github.getParams() + '&per_page=100');
}

function getTotalStars(repos) {
	return repos.data.reduce((prev, curr) => prev + curr.stargazers_count);
}

// Fetch repos -> get Total Start
function getPlayersData(player) {
	return getRepos(player.login)
	.then(getTotalStars)
	.then(totalStars => {
		return {
			followers: player.followers,
			totalStars: totalStars
		};
	})
}

// return an array
function calculateScore (players) {
	return [
		players[0].followers * 3 + players[0].totalStars,
		players[1].followers * 3 + players[1].totalStars
	];
}

var helpers = {
	getPlayersInfo(players) {
		return axios.all(players.map(username => getUserInfo(username)))
		.then(info => {
			return info.map(user => user.data);
		})
		.catch(err => {
			console.error(err);
		});
	},
	battle(players) {
		var playerOneData = getPlayersData(players[0]);
		var playerTwoData = getPlayersData(players[1]);
		return axios.all([playerOneData, playerTwoData])
		.then(calculateScore)
		.catch(err => {
			console.log('An error found.');
			console.error(err);
		});
	}
};

module.exports = helpers;