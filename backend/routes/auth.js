const { Router } = require('express');
const { register, login } = require('../controllers/user');
const mapUser = require('../helpers/mapUser');

const router = Router({ mergeParams: true });

router.post('/register', async (req, res) => {
	try {
		const { user, token } = await register(
			req.body.login,
			req.body.email,
			req.body.password,
		);

		res
			.cookie('token', token, { httpOnly: true })
			.json({ data: mapUser(user), error: null });
	} catch (e) {
		res.json({ error: e.message });
	}
});

router.post('/login', async (req, res) => {
	try {
		const { user, token } = await login(req.body.login, req.body.password);

		res
			.cookie('token', token, { httpOnly: true })
			.json({ data: mapUser(user), error: null });
	} catch (e) {
		res.json({ error: e.message });
	}
});

router.post('/logout', async (req, res) => {
	res.cookie('token', '', { httpOnly: true }).json({ data: 'success', error: null });
});

module.exports = router;
