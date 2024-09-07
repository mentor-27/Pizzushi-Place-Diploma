require('dotenv').config();
const jwt = require('jsonwebtoken');
const Token = require('../models/token');

const accessSign = process.env.JWT_ACCESS_SECRET;
const refreshSign = process.env.JWT_REFRESH_SECRET;

module.exports = {
	generateToken(data) {
		const accessToken = jwt.sign(data, accessSign, { expiresIn: '30m' });
		const refreshToken = jwt.sign(data, refreshSign, { expiresIn: '30d' });
		return { accessToken, refreshToken };
	},
	validateAccessToken(token) {
		try {
			return jwt.verify(token, accessSign);
		} catch (e) {
			return null;
		}
	},
	validateRefreshToken(token) {
		try {
			return jwt.verify(token, refreshSign);
		} catch (e) {
			return null;
		}
	},
	async saveToken(userId, refreshToken) {
		const tokenData = await Token.findOne({ user: userId });
		if (tokenData) {
			tokenData.refreshToken = refreshToken;
			return tokenData.save();
		}
		return await Token.create({ user: userId, refreshToken });
	},
	async removeToken(refreshToken) {
		return await Token.deleteOne({ refreshToken });
	},
	async findToken(refreshToken) {
		return await Token.findOne({ refreshToken });
	},
};
