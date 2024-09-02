function mapUser(user) {
	return {
		id: user._id,
		login: user.login,
		name: user.name,
		surname: user.surname,
		phone: user.phone,
		email: user.email,
		avatar: user.avatar,
		roleId: user.roleId,
	};
}

module.exports = mapUser;
