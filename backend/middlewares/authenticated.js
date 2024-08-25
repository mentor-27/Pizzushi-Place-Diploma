const User = require('../models/User');
const { verify } = require('../helpers/token');

module.exports = async function (req, res, next) {
	if (!req.cookies.token) {
		res.json({ error: "User isn't authenticated" });

		return;
	}

	const tokenData = verify(req.cookies.token);

	const user = await User.findOne({ _id: tokenData.id });

	if (!user) {
		res.cookie('token', '').json({ error: 'Unknown user' });

		return;
	}

	req.user = user;

	next();
};
