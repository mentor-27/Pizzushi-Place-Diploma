const User = require('../models/User');
const { validateAccessToken } = require('../helpers/token');

module.exports = async function (err, req, res, next) {
	if (!req.headers.authorization) {
		res.status(401).json({ error: "User isn't authenticated" });
		return;
	}

	const token = req.headers.authorization.split(' ')[1];
	const tokenData = validateAccessToken(token);

	const user = await User.findById(tokenData?.id);

	if (!user) {
		res.clearCookie('refreshToken').json({ error: 'Unknown user' });
		return;
	}

	req.user = user;

	next();
};
