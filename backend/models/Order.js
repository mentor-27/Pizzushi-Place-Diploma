const { Schema, model } = require('mongoose');
const validator = require('validator');

const OrderSchema = Schema(
	{
		user: {
			type: Schema.Types.ObjectId,
			ref: 'User',
		},
		guestId: String,
		cart: {
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
		status: {
			type: Number,
			default: 0,
		},
		reciever: {
			name: String,
			surname: String,
			email: {
				type: String,
				validate: {
					validator: validator.isEmail,
					message: 'Invalid email',
				},
			},
			phone: {
				type: String,
				validate: {
					validator: str => {
						return validator.isMobilePhone(str);
					},
					message: 'Invalid phone number',
				},
				required: true,
			},
			address: {
				type: String,
				required: true,
			},
			comment: String,
		},
	},
	{ timestamps: true },
);

module.exports = model('Order', OrderSchema);
