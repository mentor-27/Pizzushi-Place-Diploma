const bcrypt = require('bcrypt');
const User = require('../models/User');
const { generate } = require('../helpers/token');
const ROLES = require('../constants/roles');

async function register(login, email, password) {
	if (!login) {
		throw new Error('Login is empty');
	}

	if (!password) {
		throw new Error('Password is empty');
	}

	const passwordHash = await bcrypt.hash(password, 10);

	const user = await User.create({ login, email, password: passwordHash });

	const token = generate({ id: user.id });

	return { user, token };
}

async function login(login, password) {
	if (!login) {
		throw new Error('Login is empty');
	}

	if (!password) {
		throw new Error('Password is empty');
	}

	const user = await User.findOne({ login });

	if (!user) {
		throw new Error('User not found');
	}

	const correctPassword = await bcrypt.compare(password, user.password);

	if (!correctPassword) {
		throw new Error('Wrong password');
	}

	const token = generate({ id: user._id });

	return { user, token };
}

function getUsers() {
	return User.find();
}

function getUser(userId) {
	return User.findOne({ _id: userId });
}

async function editUser(userId, data) {
	if (!userId) {
		throw new Error('User id is empty');
	}

	const user = await User.findOneAndUpdate({ _id: userId }, data, {
		new: true,
		runValidators: true,
	});

	return user;
}

function removeUser(userId) {
	if (!userId) {
		throw new Error('User id is empty');
	}

	return User.deleteOne({ _id: userId });
}

function getRoles() {
	return [
		{ roleId: ROLES.ADMIN, name: 'Administrator' },
		{ roleId: ROLES.MODERATOR, name: 'Moderator' },
		{ roleId: ROLES.CLIENT, name: 'Client' },
	];
}

module.exports = {
	register,
	login,
	getUsers,
	getUser,
	editUser,
	removeUser,
	getRoles,
};
