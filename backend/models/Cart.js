const { Schema, model } = require('mongoose');

const CartSchema = Schema(
	{
		user: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			required: false,
		},
		guestId: {
			type: String,
			required: false,
		},
		products: [
			{
				item: {
					type: Schema.Types.ObjectId,
					ref: 'Product',
				},
				quantity: {
					type: Number,
					default: 1,
				},
			},
		],
		totalPrice: {
			type: Number,
			default: 0,
		},
	},
	{ timestamps: true },
);

CartSchema.pre('save', async function (next) {
	const cart = this;

	cart.populate('products.item');

	cart.totalPrice = cart.products.reduce(
		(total, product) => total + product.item.price * product.quantity,
		0,
	);

	next();
});

const Cart = model('Cart', CartSchema);

module.exports = Cart;
