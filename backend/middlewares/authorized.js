module.exports = function (roles) {
	return (req, res, next) => {
		if (!roles.includes(req.user?.roleId)) {
			res.status(403).json({ error: 'Access denied' });

			return;
		}

		next();
	};
};
