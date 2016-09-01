import axios  from 'axios';
import _  from 'lodash';

const githubApi = 'https://api.github.com';
const github = {
	id: '',
	secret: '',
	getParams() {
		return `?client_id=${this.id}&client_secret=${this.secret}`;
	}
};

function getUserInfo(username = 'doron2402') {
	return axios.get(`${githubApi}/users/${username}${github.getParams()}`)
}


function getRepos(username = 'doron2402') {
	return axios.get(`${githubApi}/users/${username}/repos${github.getParams()}&per_page=100`);
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
function getPlayersData({ login = 'doron2402', followers = 0, public_repos = 0}) {
	return getRepos(login)
	.then(getTotalStars)
	.then(getTotalForks)
	.then(obj => (
		{
			followers: followers || 0,
			totalStars: obj.totalStars || 0,
			totalForks: obj.totalForks || 0,
			publicRepos: public_repos || 0
		}
	)).catch(err => {
		console.warn(err);
	});
}

function scoreAlgorithm(player) {
	if (!player) {
		return 0;
	}
	var total = player.followers * 5;
	total += player.totalStars * 20;
	total += player.totalForks * 15;
	total += player.publicRepos;
	return _.parseInt(total);
}

// return an array
function calculateScore (players) {
	debugger;
	return [
		scoreAlgorithm(players[0]),
		scoreAlgorithm(players[1])
	];
}

export function getPlayersInfo(players) {
	return axios.all(players.map(username => getUserInfo(username)))
	.then(info => info.map(user => user.data))
	.catch(err => { console.error(err); });
};

export function battle(players) {
	const playerOneData = getPlayersData(players[0]);
	const playerTwoData = getPlayersData(players[1]);
	return axios.all([playerOneData, playerTwoData])
	.then(calculateScore)
	.catch(err => {
		console.warn('An error found.');
		console.error(err);
	});
};
