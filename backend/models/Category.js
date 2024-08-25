const { Schema, model } = require('mongoose');

const CategorySchema = Schema({
	name: {
		type: String,
		required: true,
		unique: true,
	},
	slug: {
		type: String,
		required: true,
		unique: true,
	},
});

const Category = model('Category', CategorySchema);

module.exports = Category;
