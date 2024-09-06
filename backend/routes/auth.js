const { Router } = require('express');
const { register, login, logout, refresh } = require('../controllers/user');
const mapUser = require('../helpers/mapUser');
const mapOrder = require('../helpers/mapOrder');
const authenticated = require('../middlewares/authenticated');

const router = Router({ mergeParams: true });

router.post('/register', async (req, res) => {
	try {
		const { user, accessToken, refreshToken } = await register(
			req.body.email,
			req.body.password,
		);
		res
			.cookie('refreshToken', refreshToken, {
				httpOnly: true,
				maxAge: 30 * 24 * 60 * 60 * 1000,
				// secure: true
			})
			.json({
				data: { ...mapUser(user), accessToken },
				error: null,
			});
	} catch (e) {
		res.json({ error: e.message });
	}
});

router.post('/login', async (req, res) => {
	try {
		const { user, accessToken, refreshToken, cart, roles, users, orders } = await login(
			req.body.authId,
			req.body.password,
			req.cookies.guestId,
		);
		res
			.clearCookie('guestId')
			.cookie('refreshToken', refreshToken, {
				httpOnly: true,
				maxAge: 30 * 24 * 60 * 60 * 1000,
				// secure: true
			})
			.json({
				data: { ...mapUser(user), accessToken },
				...(cart ? { cart } : null),
				...(roles ? { roles } : null),
				...(users ? { users: users.map(mapUser) } : null),
				...(orders ? { orders: orders.map(mapOrder) } : null),
				error: null,
			});
	} catch (e) {
		res.json({ error: e.message });
	}
});

router.get('/refresh', async (req, res) => {
	try {
		const { user, accessToken, refreshToken } = await refresh(req.cookies.refreshToken);
		res
			.cookie('refreshToken', refreshToken, {
				httpOnly: true,
				maxAge: 30 * 24 * 60 * 60 * 1000,
				// secure: true
			})
			.json({ data: { ...mapUser(user), accessToken }, error: null });
	} catch (e) {
		res.json({ error: e.message });
	}
});

router.post('/logout', authenticated, async (req, res) => {
	try {
		await logout(req.cookies.refreshToken);
		res.clearCookie('refreshToken').json({ data: 'success', error: null });
	} catch (e) {
		res.json({ error: e.message });
	}
});

module.exports = router;
