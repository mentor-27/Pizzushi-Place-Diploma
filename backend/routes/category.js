const { Router } = require('express');
const {
	getCategories,
	getCategory,
	addCategory,
	editCategory,
	removeCategory,
} = require('../controllers/Category');
const mapCategory = require('../helpers/mapCategory');
const authenticated = require('../middlewares/authenticated');
const authorized = require('../middlewares/authorized');
const ROLES = require('../constants/roles');

const router = Router({ mergeParams: true });

router.get('/', async (req, res) => {
	try {
		const categories = await getCategories();

		res.json({ data: categories.map(mapCategory), error: null });
	} catch (e) {
		res.json({ error: e.message });
	}
});

// router.get('/:id', async (req, res) => {
// 	try {
// 		const category = await getCategory(req.params.id);

// 		res.json({ data: mapCategory(category), error: null });
// 	} catch (e) {
// 		res.json({ error: e.message });
// 	}
// });

router.post(
	'/',
	authenticated,
	authorized([ROLES.ADMIN, ROLES.MODERATOR]),
	async (req, res) => {
		try {
			const category = await addCategory(req.body);

			res.json({ data: mapCategory(category), error: null });
		} catch (e) {
			res.json({ error: e.message });
		}
	},
);

router.patch(
	'/:id',
	authenticated,
	authorized([ROLES.ADMIN, ROLES.MODERATOR]),
	async (req, res) => {
		try {
			const category = await editCategory(req.params.id, req.body);

			res.json({ data: mapCategory(category), error: null });
		} catch (e) {
			res.json({ error: e.message });
		}
	},
);

router.delete(
	'/:id',
	authenticated,
	authorized([ROLES.ADMIN, ROLES.MODERATOR]),
	async (req, res) => {
		try {
			const result = await removeCategory(req.params.id);

			res.json({ data: result, error: null });
		} catch (e) {
			res.json({ error: e.message });
		}
	},
);

module.exports = router;
