const Category = require('../models/category');
const { slugify: sl } = require('transliteration');

function getCategories() {
	return Category.find();
}

function getCategory(categoryId) {
	return Category.findOne({ _id: categoryId });
}

function addCategory(data) {
	if (!data?.name) {
		throw new Error('Category name is empty');
	}

	if (!data?.slug) {
		data.slug = sl(data.name);
	}

	return Category.create(data);
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
