const { Schema, model } = require('mongoose');
const Counter = require('./Counter');
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
						required: true,
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
			email: String,
			phone: {
				type: String,
				validate: {
					validator: validator.isMobilePhone,
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
		orderNumber: {
			type: Number,
			unique: true,
		},
	},
	{ timestamps: true },
);

OrderSchema.pre('save', async function (next) {
	if (this.isNew) {
		try {
			const counter = await Counter.findOneAndUpdate(
				{ model: 'Order' },
				{ $inc: { count: 1 } },
				{ new: true, upsert: true },
			);
			this.orderNumber = counter.count;
			next();
		} catch (error) {
			next(error);
		}
	} else {
		next();
	}
});

module.exports = model('Order', OrderSchema);
