const mapCategory = require('./mapCategory');

function mapProduct(item) {
	return {
		id: item._id,
		name: item.name,
		description: item.description,
		category: mapCategory(item.categoryId),
		imageUrl: item.imageUrl,
		price: item.price,
		popularity: item.popularity,
	};
}

module.exports = mapProduct;
