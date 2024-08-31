const { Router } = require('express');
const {
	getItems,
	getItem,
	addItem,
	editItem,
	removeItem,
	editAll,
	editGroup,
	getItemsByQuery,
} = require('../controllers/product');
const mapProduct = require('../helpers/mapProduct');
const authenticated = require('../middlewares/authenticated');
const authorized = require('../middlewares/authorized');
const ROLES = require('../constants/roles');

const router = Router({ mergeParams: true });

router.get('/', async (req, res) => {
	try {
		const { sortBy, sortOrder } = req.query;

		const products = await getItems(sortBy, sortOrder);

		res.json({ data: { products: products.map(mapProduct) }, error: null });
	} catch (e) {
		res.json({ error: e.message });
	}
});

router.get('/search', async (req, res) => {
	try {
		const items = await getItemsByQuery(req.query.query);

		res.json({ data: items.map(mapProduct), error: null });
	} catch (e) {
		res.json({ error: e.message });
	}
});

router.get('/:id', async (req, res) => {
	try {
		const item = await getItem(req.params.id);

		res.json({ data: mapProduct(item), error: null });
	} catch (e) {
		res.json({ error: e.message });
	}
});

router.post(
	'/',
	authenticated,
	authorized([ROLES.ADMIN, ROLES.MODERATOR]),
	async (req, res) => {
		try {
			const item = await addItem(req.body);

			res.json({ data: mapProduct(item), error: null });
		} catch (e) {
			res.json({ error: e.message });
		}
	},
);

router.patch(
	'/editgroup',
	authenticated,
	authorized([ROLES.ADMIN, ROLES.MODERATOR]),
	async (req, res) => {
		try {
			const result = await editGroup(req.body.searchParam, req.body.updateData);

			res.json({ data: result, error: null });
		} catch (e) {
			res.json({ error: e.message });
		}
	},
);

router.patch(
	'/editall',
	authenticated,
	authorized([ROLES.ADMIN, ROLES.MODERATOR]),
	async (req, res) => {
		try {
			const result = await editAll(req.body);

			res.json({ data: result, error: null });
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
			const item = await editItem(req.params.id, req.body);

			res.json({ data: mapProduct(item), error: null });
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
			const result = await removeItem(req.params.id);

			res.json({ data: result, error: null });
		} catch (e) {
			res.json({ error: e.message });
		}
	},
);

module.exports = router;
