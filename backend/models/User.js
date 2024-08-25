const { Schema, model } = require('mongoose');
const validator = require('validator');
const ROLES = require('../constants/roles');

const UserSchema = Schema(
	{
		login: {
			type: String,
			required: true,
			unique: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
			validate: {
				validator: validator.isEmail,
				message: 'Invalid email',
			},
		},
		password: {
			type: String,
			required: true,
		},
		roleId: {
			type: Number,
			default: ROLES.CLIENT,
		},
		orders: [
			{
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
				status: {
					type: Number,
					default: 0,
				},
				date: {
					type: Date,
					default: Date.now,
				},
			},
		],
	},
	{ timestamps: true },
);

const User = model('User', UserSchema);

module.exports = User;
