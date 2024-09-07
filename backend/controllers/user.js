const bcrypt = require('bcrypt');
const User = require('../models/User');
const Token = require('../models/Token');
const {
	generateToken,
	validateAccessToken,
	validateRefreshToken,
	saveToken,
	removeToken,
	findToken,
} = require('../helpers/token');
const { mergeCarts, getCart } = require('./cart');
const ROLES = require('../constants/roles');
const { getOrders } = require('./order');

async function register(email, password, guestId = '') {
	if (!email) {
		throw new Error('Email is empty');
	}

	if (!password) {
		throw new Error('Password is empty');
	}

	const passwordHash = await bcrypt.hash(password, 10);
	const user = await User.create({ email, password: passwordHash });

	const tokens = generateToken({ id: user.id });
	await saveToken(user.id, tokens.refreshToken);

	await mergeCarts(tokens.refreshToken, guestId);
	const cart = await getCart(tokens.refreshToken);

	return { user, ...tokens, cart };
}

async function login(authId, password, guestId = '') {
	if (!authId) {
		throw new Error('Login is empty');
	}

	if (!password) {
		throw new Error('Password is empty');
	}

	const user = await User.findOne({ $or: [{ login: authId }, { email: authId }] });
	if (!user) {
		throw new Error('User not found');
	}

	const correctPassword = await bcrypt.compare(password, user.password);
	if (!correctPassword) {
		throw new Error('Wrong password');
	}

	const tokens = generateToken({ id: user._id });
	await saveToken(user._id, tokens.refreshToken);

	await mergeCarts(tokens.refreshToken, guestId);
	const cart = await getCart(tokens.refreshToken);

	let roles, users, orders;
	if ([0, 1].includes(user.roleId)) {
		roles = getRoles();
		users = await getUsers();
		orders = await getOrders();
	}

	return { user, ...tokens, cart, roles, users, orders };
}

async function refresh(refreshToken) {
	if (!refreshToken) {
		throw new Error('Unauthorized');
	}

	const userData = validateRefreshToken(refreshToken);
	const dbToken = findToken(refreshToken);
	if (!userData || !dbToken) {
		throw new Error('Unauthorized');
	}

	const user = await User.findById(userData.id);
	const tokens = generateToken({ id: user._id });
	await saveToken(user._id, tokens.refreshToken);

	return { user, ...tokens };
}

async function logout(refreshToken) {
	if (!refreshToken) {
		throw new Error('Unauthorized');
	}

	const tokenData = await Token.findOne({ refreshToken });
	if (!tokenData) {
		throw new Error('Unauthorized');
	}

	return await removeToken(refreshToken);
}

function getMe(accessToken, refreshToken) {
	const acsToken = accessToken?.split(' ')[1];

	if (!acsToken || !refreshToken) {
		throw new Error('Unauthorized');
	}

	const acsTokenData = validateAccessToken(acsToken);
	const refTokData = validateRefreshToken(refreshToken);

	if (!acsTokenData || !refTokData) {
		throw new Error('Unauthorized');
	}

	return User.findById(refTokData.id);
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
	refresh,
	logout,
	getMe,
	getUsers,
	getUser,
	editUser,
	removeUser,
	getRoles,
};
