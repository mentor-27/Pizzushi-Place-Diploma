function mapCategory(category) {
	return {
		id: category._id,
		name: category.name,
		slug: category.slug,
	};
}

module.exports = mapCategory;
