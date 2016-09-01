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

function getTotalStars({ data }) {
	if (_.isEmpty(data)) {
		return 0;
	}

	const totalStars = data.reduce((prev, curr) => {
		if (!_.isNumber(prev)) {
			prev = 0;
		}
		
		return !curr.stargazers_count || !_.isNumber(curr.stargazers_count) ? 
		prev : _.parseInt(prev + curr.stargazers_count);
	});
	return totalStars;
}

function getTotalForks({data}) {
	if (_.isEmpty(data)) {
		return 0;
	}

	const totalForks = data.reduce((prev, curr) => {
		if (!_.isNumber(prev)) {
			prev = 0;
		}
		
		return !curr.forks_count || isNaN(curr.forks_count) ? 
		prev :  _.parseInt(prev + curr.forks_count);
	});
	return totalForks;
}

// Fetch repos -> get Total Start
async function getPlayersData({ login = 'doron2402', followers = 0, public_repos = 0}) {
	try {
		const repos = await getRepos(login);
		const publicRepos = public_repos;
		const totalStars = getTotalStars(repos);
		const totalForks = getTotalForks(repos);
		return {
			followers,
			totalStars,
			totalForks,
			publicRepos
		};
	} catch (err) {
		console.error(`Error: Github Helper getPlayersData ${JSON.stringify(err)}`);
	}
}

function scoreAlgorithm(player) {
	if (!player) {
		return 0;
	}
	var total = player.followers * 5;
	total += player.totalStars * 20;
	total += player.totalForks * 15;
	total += player.publicRepos * 5;
	return _.parseInt(total);
}

// return an array
function calculateScore (players) {
	return [
		scoreAlgorithm(players[0]),
		scoreAlgorithm(players[1])
	];
}

export async function getPlayersInfo(players) {
	try {
		const info = await Promise.all(players.map(username => getUserInfo(username)));
		return info.map(user => user.data);
	} catch (err) {
		console.error(JSON.stringify(err));
	}
};

export async function battle(players) {
	const playerOneData = getPlayersData(players[0]);
	const playerTwoData = getPlayersData(players[1]);
	try {
		const data = await Promise.all([playerOneData, playerTwoData]);
		return calculateScore(data);
	} catch (err) {
		console.error(JSON.stringify(err));
	}
};
