const { Schema, model } = require('mongoose');
const validator = require('validator');

const ProductSchema = Schema(
	{
		name: {
			type: String,
			required: true,
		},
		description: String,
		categoryId: {
			type: Schema.Types.ObjectId,
			ref: 'Category',
			required: true,
		},
		imageUrl: {
			type: String,
			required: true,
			validate: {
				validator: validator.isURL,
				message: 'Invalid image url',
			},
		},
		price: {
			type: Number,
			required: true,
		},
		popularity: {
			type: Number,
			default: 1,
		},
	},
	{ timestamps: true },
);

const Product = model('Product', ProductSchema);

module.exports = Product;
