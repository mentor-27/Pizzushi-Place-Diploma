function mapUser(user) {
	return {
		id: user._id,
		login: user.login,
		email: user.email,
	};
}

module.exports = mapUser;
