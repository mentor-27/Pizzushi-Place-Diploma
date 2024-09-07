const Product = require('../models/product');
const Cart = require('../models/cart');
const Order = require('../models/order');
const User = require('../models/user');
const { validateRefreshToken } = require('../helpers/token');

async function getCart(refreshToken, guestId = '') {
	const userId = refreshToken ? validateRefreshToken(refreshToken)?.id : null;

	const cart = await Cart.findOne({
		$or: [{ user: userId }, { guestId }],
	}).populate('products.item', 'name description categoryId imageUrl price popularity');

	return cart || {};
}

async function addProductToCart(refreshToken, guestId = '', productId, quantity) {
	const product = await Product.findById(productId);

	if (!product) {
		throw new Error('Product not found');
	}

	let cart = null;

	const userId = refreshToken ? validateRefreshToken(refreshToken).id : null;
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

async function mergeCarts(refreshToken, guestId) {
	const userId = refreshToken ? validateRefreshToken(refreshToken).id : null;
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

async function removeProductFromCart(refreshToken, guestId, productId) {
	const userId = refreshToken ? validateRefreshToken(refreshToken).id : null;

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

async function clearCart(refreshToken, guestId) {
	const userId = refreshToken ? validateRefreshToken(refreshToken).id : null;
	const cart = await Cart.findOne({ $or: [{ user: userId }, { guestId }] });

	if (!cart) {
		throw new Error('Cart not found');
	}

	return Cart.updateOne(
		{ $or: [{ user: userId }, { guestId }] },
		{ products: [], totalPrice: 0 },
	);
}

async function cartCheckout(refreshToken, guestId, data) {
	const userId = refreshToken ? validateRefreshToken(refreshToken).id : null;

	let cart = await Cart.findOne({ $or: [{ user: userId }, { guestId }] });

	if (!cart) {
		throw new Error('Cart not found');
	}

	cart.products.forEach(async ({ item, quantity }) => {
		await Product.findOneAndUpdate({ _id: item }, { $inc: { popularity: quantity } });
	});

	await cart.populate(
		'products.item',
		'name description categoryId imageUrl price popularity',
	);

	const newOrder = new Order({
		user: userId || null,
		guestId: userId ? null : guestId,
		cart: {
			products: cart.products,
			totalPrice: cart.totalPrice,
		},
		reciever: { ...data },
	});

	await newOrder.save();

	if (userId) {
		await User.findOneAndUpdate({ _id: userId }, { $push: { orders: newOrder._id } });
	}

	await Cart.deleteOne({ $or: [{ user: userId }, { guestId }] });

	return newOrder;
}

module.exports = {
	getCart,
	addProductToCart,
	mergeCarts,
	removeProductFromCart,
	clearCart,
	cartCheckout,
};
