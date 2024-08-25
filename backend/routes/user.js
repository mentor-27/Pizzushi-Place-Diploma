const { Router } = require('express');
const {
	getUsers,
	getUser,
	editUser,
	removeUser,
	getRoles,
} = require('../controllers/user');
const mapUser = require('../helpers/mapUser');
const authenticated = require('../middlewares/authenticated');
const authorized = require('../middlewares/authorized');
const ROLES = require('../constants/roles');

const router = Router({ mergeParams: true });

router.get(
	'/',
	authenticated,
	authorized([ROLES.ADMIN, ROLES.MODERATOR]),
	async (req, res) => {
		try {
			const users = await getUsers();

			res.json({ data: users.map(mapUser), error: null });
		} catch (e) {
			res.json({ error: e.message });
		}
	},
);

router.get(
	'/roles',
	authenticated,
	authorized([ROLES.ADMIN, ROLES.MODERATOR]),
	async (req, res) => {
		try {
			const roles = getRoles();

			res.json({ data: roles, error: null });
		} catch (e) {
			res.json({ error: e.message });
		}
	},
);

router.get(
	'/:id',
	authenticated,
	authorized([ROLES.ADMIN, ROLES.MODERATOR]),
	async (req, res) => {
		try {
			const user = await getUser(req.params.id);

			res.json({ data: mapUser(user), error: null });
		} catch (e) {
			res.json({ error: e.message });
		}
	},
);

router.patch('/:id', authenticated, authorized([ROLES.ADMIN]), async (req, res) => {
	try {
		const user = await editUser(req.params.id, req.body);

		res.json({ data: mapUser(user), error: null });
	} catch (e) {
		res.json({ error: e.message });
	}
});

router.delete('/:id', authenticated, authorized([ROLES.ADMIN]), async (req, res) => {
	try {
		const result = await removeUser(req.params.id);

		res.json({ data: result, error: null });
	} catch (e) {
		res.json({ error: e.message });
	}
});

module.exports = router;
