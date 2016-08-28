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

var helpers = {
	getPlayersInfo(players) {
		return axios.all(players.map(username => getUserInfo(username)))
		.then(info => {
			return info.map(user => user.data);
		})
		.catch(err => {
			console.error(err);
		});
	}
};

module.exports = helpers;