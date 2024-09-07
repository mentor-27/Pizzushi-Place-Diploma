const { Router } = require('express');
const { getOrders, removeOrder } = require('../controllers/order');
const mapOrder = require('../helpers/mapOrder');
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
			const orders = await getOrders();

			res.json({ data: orders.map(mapOrder), error: null });
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
			const result = await removeOrder(req.params.id);

			res.json({ data: result, error: null });
		} catch (e) {
			res.json({ error: e.message });
		}
	},
);

module.exports = router;
