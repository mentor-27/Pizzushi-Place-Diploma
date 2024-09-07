const Product = require('../models/Product');

async function getItems(sortBy = 'popularity', sortOrder = -1) {
	const products = await Product.find().sort({ [sortBy]: Number(sortOrder) });
	return await Promise.all(products.map(product => product.populate('categoryId')));
}

// async function getItemsByQuery(itemName) {
// 	const items = await Product.find({ name: { $regex: itemName, $options: 'i' } });

// 	return Promise.all(items.map(item => item.populate('categoryId')));
// }

async function getItem(itemId) {
	if (!itemId) {
		throw new Error('Item id is empty');
	}

	const item = await Product.findOne({ _id: itemId });

	await item.populate('categoryId');

	return item;
}

async function addItem(data) {
	if (!data) {
		throw new Error('Wrong data');
	}

	const item = await Product.create(data);

	await item.populate('categoryId');

	return item;
}

async function editItem(itemId, data) {
	const item = await Product.findOneAndUpdate({ _id: itemId }, data, {
		new: true,
		runValidators: true,
	});

	await item.populate('categoryId');

	return item;
}

function editGroup(searchParam, data) {
	return Product.updateMany(searchParam, data);
}

function editAll(data) {
	return Product.updateMany({ name: /.+/ }, data);
}

function removeItem(itemId) {
	if (!itemId) {
		throw new Error('Invalid id');
	}

	return Product.deleteOne({ _id: itemId });
}

module.exports = {
	getItems,
	// getItemsByQuery,
	getItem,
	addItem,
	editItem,
	editGroup,
	editAll,
	removeItem,
};
