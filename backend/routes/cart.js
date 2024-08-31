const { Router } = require('express');
const {
	getCart,
	addProductToCart,
	removeProductFromCart,
	clearCart,
	cartCheckout,
} = require('../controllers/cart');

const router = Router({ mergeParams: true });

router.get('/', async (req, res) => {
	try {
		const { products, totalPrice } = await getCart(
			req.cookies.refreshToken,
			req.cookies.guestId,
		);
		res.json({ data: { products, totalPrice }, error: null });
	} catch (e) {
		res.json({ error: e.message });
	}
});

router.post('/checkout', async (req, res) => {
	try {
		const data = await cartCheckout(
			req.cookies.refreshToken,
			req.cookies.guestId,
			req.body,
		);

		res.json({ data, error: null });
	} catch (e) {
		res.json({ error: e.message });
	}
});

router.post('/:productId', async (req, res) => {
	try {
		const { products, totalPrice } = await addProductToCart(
			req.cookies.refreshToken,
			req.cookies.guestId,
			req.params.productId,
			req.query.qty,
		);

		if (req.cookies.token && req.cookies.guestId) {
			res.clearCookie('guestId');
		}

		res.json({ data: { products, totalPrice }, error: null });
	} catch (e) {
		res.json({ error: e.message });
	}
});

router.delete('/:productId', async (req, res) => {
	try {
		const { products, totalPrice } = await removeProductFromCart(
			req.cookies.refreshToken,
			req.cookies.guestId,
			req.params.productId,
		);

		res.json({ data: { products, totalPrice }, error: null });
	} catch (e) {
		res.json({ error: e.message });
	}
});

router.delete('/', async (req, res) => {
	try {
		const data = await clearCart();

		res.json({ data, error: null });
	} catch (e) {
		res.json({ error: e.message });
	}
});

module.exports = router;
