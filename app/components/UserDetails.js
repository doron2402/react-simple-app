import React, { PropTypes } from 'react';
import _ from 'lodash';

function UserDetails({score, info}) {
	return (
		<div>
			{!!score && <li className="list-group-item"><h3>Score: {score}</h3></li>}
			<li className="list-group-item">
				<img src={info.avatar_url} className="img-rounded img-responsive" />
			</li>
			{info.name && <li className="list-group-item">Name: {info.name}</li>}
			<li className="list-group-item">
				Username: {info.login}
			</li>
			{info.location && <li className="list-group-item">Location: {info.location}</li>}
			{info.company && <li className="list-group-item">Company: {info.company}</li>}
			{_.isNumber(info.followers) && <li className="list-group-item">Followers: {info.followers}</li>}
			{_.isNumber(info.following) && <li className="list-group-item">Following: {info.following}</li>}
			{_.isNumber(info.public_repos) && <li className="list-group-item">Public Repos: {info.public_repos}</li>}
			{info.blog && <li className="list-group-item">Blog: <a href={info.blog}>{info.blog}</a></li>}
		</div>
	)
}

UserDetails.propTypes = {
	score: PropTypes.number,
	info: PropTypes.shape({
		avatar_url: PropTypes.string.isRequired,
		blog: PropTypes.string,
		location: PropTypes.string,
		company: PropTypes.string,
		name: PropTypes.string,
		login: PropTypes.string.isRequired,
		following: PropTypes.number,
		followers: PropTypes.number,
		public_repos: PropTypes.number,
		blog: PropTypes.string
	})
};

export default UserDetails;
