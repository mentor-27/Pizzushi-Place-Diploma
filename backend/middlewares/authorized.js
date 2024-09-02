module.exports = function (roles) {
	return (err, req, res, next) => {
		if (!roles.includes(req.user?.roleId)) {
			res.json({ error: 'Access denied' });

			return;
		}

		next();
	};
};
