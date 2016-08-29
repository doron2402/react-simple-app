var axios = require('axios');
var _ = require('lodash');
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

function getTotalStars(obj) {
	obj.totalStars = obj.data.reduce((prev, curr) => {
		if (!_.isNumber(prev)) {
			prev = 0;
		}
		
		return !curr.stargazers_count || !_.isNumber(curr.stargazers_count) ? 
		prev : _.parseInt(prev + curr.stargazers_count);
	});
	return obj;
}

function getTotalForks(obj) {
	obj.totalForks = obj.data.reduce((prev, curr) => {
		if (!_.isNumber(prev)) {
			prev = 0;
		}
		
		return !curr.forks_count || isNaN(curr.forks_count) ? 
		prev :  _.parseInt(prev + curr.forks_count);
	});
	return obj;
}

// Fetch repos -> get Total Start
function getPlayersData(player) {
	return getRepos(player.login)
	.then(getTotalStars)
	.then(getTotalForks)
	.then(obj => {
		return {
			followers: player.followers || 0,
			totalStars: obj.totalStars,
			totalForks: obj.totalForks,
			publicRepos: player.public_repos
		};
	}).catch(err => {
		console.warn(err);
	});
}

function scoreAlgorithm(player) {
	var total = player.followers * 5;
	total += player.totalStars * 20;
	total += player.totalForks * 15;
	total += player.publicRepos;
	return _.parseInt(total);
}

// return an array
function calculateScore (players) {

	return [
		scoreAlgorithm(players[0]),
		scoreAlgorithm(players[1])
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
			console.warn('An error found.');
			console.error(err);
		});
	}
};

module.exports = helpers;