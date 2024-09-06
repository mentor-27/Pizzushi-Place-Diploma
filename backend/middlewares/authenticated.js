const User = require('../models/User');
const { validateAccessToken } = require('../helpers/token');

module.exports = async function (req, res, next) {
	try {
		if (!req.headers.authorization) {
			return res.status(401).json({ error: "User isn't authenticated" });
		}

		const token = req.headers.authorization.split(' ')[1];
		const tokenData = validateAccessToken(token);

		if (!tokenData) {
			return res.status(401).json({ error: 'Invalid token' });
		}

		const user = await User.findById(tokenData.id);

		if (!user) {
			return res.clearCookie('refreshToken').json({ error: 'Unknown user' });
		}

		req.user = user;
		next();
	} catch (error) {
		console.error('Authentication error:', error);
		return res.status(500).json({ error: 'Server error during authentication' });
	}
};
