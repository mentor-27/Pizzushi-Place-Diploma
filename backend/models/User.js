const { Schema, model } = require('mongoose');
const validator = require('validator');
const ROLES = require('../constants/roles');

const UserSchema = Schema(
	{
		login: String,
		email: {
			type: String,
			validate: {
				validator: validator.isEmail,
				message: 'Invalid email',
			},
			required: true,
			unique: true,
		},
		name: String,
		surname: String,
		phone: String,
		avatar: String,
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
				type: Schema.Types.ObjectId,
				ref: 'Order',
			},
		],
		// TODO develop
		// isActivated: {
		// 	type: Boolean,
		// 	default: false,
		// },
		// activationLink: String,
	},
	{ timestamps: true },
);

const User = model('User', UserSchema);

module.exports = User;
