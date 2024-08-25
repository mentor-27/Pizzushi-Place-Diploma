const Product = require('../models/Product');
const Cart = require('../models/Cart');
const { verify } = require('../helpers/token');

async function getCart(token, guestId) {
	const userId = token ? verify(token).id : null;

	const cart = await Cart.findOne({
		$or: [{ user: userId }, { guestId }],
	}).populate('products.item', 'name description categoryId imageUrl price popularity');

	return cart || {};
}

async function addProductToCart(token, guestId, productId, quantity) {
	const product = await Product.findById(productId);

	if (!product) {
		throw new Error('Product not found');
	}

	let cart = null;

	const userId = token ? verify(token).id : null;
	let userCart = userId ? await Cart.findOne({ user: userId }) : null;
	let guestCart = await Cart.findOne({ guestId });

	if ((userId && !guestCart) || (!userId && guestCart)) {
		if (userId && !userCart) {
			userCart = await Cart.create({ user: userId });
		}
		cart = guestCart || userCart;
		const index = cart.products.findIndex(({ item }) => item.toString() === productId);

		if (index > -1) {
			cart.products[index].quantity = Number(quantity);
		} else {
			cart.products.push({ item: productId, quantity: Number(quantity) });
		}

		await cart.populate(
			'products.item',
			'name description categoryId imageUrl price popularity',
		);
	} else if (!userId && !guestCart) {
		cart = await Cart.create({
			...(userId ? { user: userId } : undefined),
			guestId: userId ? null : guestId,
			products: [{ item: productId, quantity: quantity || 1 }],
			totalPrice: product.price,
		});
	}

	await cart.save();
	return cart;
}

async function mergeCarts(token, guestId) {
	const userId = token ? verify(token).id : null;
	if (!userId) {
		throw new Error('Unknown user');
	}

	let userCart = await Cart.findOne({ user: userId });
	let guestCart = await Cart.findOne({ guestId });

	if (!userCart) {
		userCart = await Cart.create({ user: userId });
	}

	guestCart?.products.forEach(guestProduct => {
		const pIndex = userCart.products.findIndex(
			userProduct => userProduct.item.toString() === guestProduct.item.toString(),
		);

		if (pIndex > -1) {
			userCart.products[pIndex].quantity += guestProduct.quantity;
		} else {
			userCart.products.push(guestProduct);
		}
	});

	await userCart.populate(
		'products.item',
		'name description categoryId imageUrl price popularity',
	);

	await userCart.save();

	await Cart.deleteOne({ guestId });
}

async function removeProductFromCart(token, guestId, productId) {
	const userId = token ? verify(token).id : null;

	let cart = await Cart.findOne({ $or: [{ user: userId }, { guestId }] });

	if (!cart) {
		throw new Error('Cart not found');
	}

	cart.products = cart.products.filter(({ item }) => item.toString() !== productId);

	await cart.populate(
		'products.item',
		'name description categoryId imageUrl price popularity',
	);

	await cart.save();
	return cart;
}

module.exports = {
	getCart,
	addProductToCart,
	mergeCarts,
	removeProductFromCart,
};
