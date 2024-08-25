const Category = require('../models/Category');
const { slugify: sl } = require('transliteration');

function getCategories() {
	return Category.find();
}

function getCategory(categoryId) {
	return Category.findOne({ _id: categoryId });
}

function addCategory(name) {
	if (!name) {
		throw new Error('Category name is empty');
	}

	const slug = sl(name);

	return Category.create({ name, slug });
}

function editCategory(categoryId, data) {
	if (!categoryId) {
		throw new Error('Category id is empty');
	}

	return Category.findOneAndUpdate({ _id: categoryId }, data, {
		new: true,
		runValidators: true,
	});
}

function removeCategory(categoryId) {
	if (!categoryId) {
		throw new Error('Category id is empty');
	}

	return Category.deleteOne({ _id: categoryId });
}

module.exports = {
	getCategories,
	getCategory,
	addCategory,
	editCategory,
	removeCategory,
};
