const { Schema, model } = require('mongoose');
const validator = require('validator');
const ROLES = require('../constants/roles');

const UserSchema = Schema(
	{
		login: {
			type: String,
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
		name: String,
		surname: String,
		phone: {
			type: String,
			validate: {
				validator: str => {
					return validator.isMobilePhone(str);
				},
				message: 'Invalid phone number',
			},
		},
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
